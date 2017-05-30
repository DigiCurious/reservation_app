var express = require("express"),
    react = require("react"),
    app = express(),
    ses = require("node-ses"),
    ejs = require("ejs"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    Item = require("./models/item.js"),
    //removeOldOnes = require("./models/removeOldOnes"),
    Reservation = require("./models/reservation"),
   // sendMail = require("./models/sendMail.js"),
    User = require("./models/user.js"),
   // nodemailer = require("nodemailer"),
    //Admin = require("./models/admin.js"),
    seedDB = require("./models/seeds.js");
    
app.set("view engine", "ejs");
    
mongoose.connect("mongodb://localhost/reservation_app");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();




// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


//MAIL CONFIG

var client = ses.createClient({ key: 'AKIAJPUH33LF4SRERTUA',
                                secret: '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',
                                amazon: 'https://email.eu-west-1.amazonaws.com' });
                                

//REGISTER ROUTES

// show register form
app.get("/register", function(req, res){
   res.render("signup"); 
});

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            username: req.body.username,
                            email: req.body.email,
                            admin: false
                         });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/reservation/new/dates"); 
        });
    });
});

//show login form
app.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/reservation/new/dates",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//USER ROUTES

app.get("/", function(req,res){
    res.redirect("/catalog");
});

app.get("/catalog", isLoggedIn, function(req,res){
    var admin = req.user.admin;
    Item.find({}, function(err, allItems){
        if(err){
            console.log(err);
        }else{
            res.render("catalog", {items: allItems, admin:admin});
        }
    });
});

app.get("/catalog/:id", function(req,res){
    Item.findById(req.params.id, function(err, foundItem){
        if(err){
            console.log(err);
        }else{
            res.render("index", {item: foundItem});
        }
    });
});

app.get("/reservation/new/dates", isLoggedIn ,function(req, res){
            res.render("dates");
    });

app.post("/reservation/new", function(req, res){
    var from = req.body.from;
    var to = req.body.to;
    var URL = "/reservation/new/items?from=" + from + "&to=" + to;
    res.redirect(URL);
});

app.get("/reservation/new/items", function(req,res){
    //console.log(ids);
    Reservation.find({$and:[{from: {$lt: req.query.to}}, {to: {$gt: req.query.from}}] 
                }, function(err, reservations){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(reservations);
                        var isReserved = reservations.reduce(function (accumulator, reservation) {
                                accumulator[reservation.itemId] = true;
                                return accumulator;
                            }, {});
                        console.log("isReserved is" + isReserved);
                        Item.find({}, function(err, items){
                            if(err){
                                console.log(err);
                            }else{
                                var availableItems = items.filter(function(item){
                                    return isReserved[item._id] !== true;
                                });
                                console.log("available items: " + availableItems);
                                res.render("items", {items:availableItems, from:req.query.from, to:req.query.to});
                            }
                        });
                        }
                        });
}); 

app.post("/reservation", isLoggedIn, function(req, res){
    var URL = "/reservation/";
    var from = req.body.from;
    var to = req.body.to;
        
    var batchId = makeBatchId();
    
    Item.find({_id: req.body.id}, function(err, reservedItems){
        if(err){
            console.log(err);
        } else {
                reservedItems.forEach(function(item){
                        Reservation.create({}, function(err, reservation){
                        if(err){
                            console.log(err);
                        }else{
                            reservation.itemId = item._id;
                            reservation.batchId = batchId;
                            reservation.from = from;
                            reservation.to = to;
                            reservation.clientId = req.user._id;
                            reservation.save();
                            }
                        });
                });
                res.redirect("/reservation/" + batchId);
            }
    });
});


app.get("/reservation/:batchId", function(req, res){
    
    

    var batchId = req.params.batchId;
    var url = req.protocol + '://' + req.get('host') + req.url;
    
            Reservation.find({batchId: batchId}, function(err, reservations){
                if(err){
                    console.log(err);
                }else{
                    console.log("reservations: " + reservations);
                    var reserved = reservations.reduce(function(acc, res){
                        acc[res.itemId] = true;
                        return acc;
                    }, {});
                    console.log(reserved);
                    User.findById(reservations[0].clientId, function(err, user){
                        if(err){
                            console.log(err);
                        }else{
                            Item.find({}, function(err, allItems){
                                if(err){
                                    console.log(err);
                                }else{
                                    var reservedItems = allItems.filter(function(item){
                                    return reserved[item._id] === true;
                                    });
                                    console.log(reservedItems);
                                    var time = (Date.parse(reservations[0].to) - Date.parse(reservations[0].from))/3600/1000;
                                    var total = 0;
                                            
                                    reservedItems.forEach(function(item){
                                    total = total + item.priceHour;
                                    });
                                    
                                    res.render("summary", {reservations: reservations, user: user, items: reservedItems, time:time, total:total, url:url});
                                    ejs.renderFile("./views/emailTemplate.ejs", {reservations: reservations, user: user, items: reservedItems, time:time, total:total, url:url}, function(err, html){
                                        if(err){
                                            console.log(err);
                                        }else{
                                        client.sendEmail({
                                                   to: 'cinematography@oskaripolho.com'
                                                 , from: 'cinematography@oskaripolho.com'
                                                 , subject: 'Your reservation'
                                                 , message: html
                                                }, function (err, data, res) {
                                                     if(err){
                                                         console.log(err);
                                                     }
                                                     }
                                                     );
                                        }
                                    });              
                                    }
                            
                            });
                        }
                    });
                }
            });
        
});
                

app.get("/reservation/:batchId/edit", function(req,res){
    
    var batchId = req.params.batchId;
    
    Reservation.find({batchId: batchId}, function(err, reservations){
        if(err){
            console.log(err);
        }else{
            var to = reservations[0].to;
            var from = reservations[0].from;
            
            var inReservation = reservations.reduce(function(acc,res){
                acc[res.itemId] = true;
                return acc;
            },{});
            console.log(inReservation);
            Item.find({}, function(err, items) {
                if(err){
                    console.log(err);
                }else{
                    var reservation = items.filter(function(item){
                        return inReservation[item._id] === true;
                    });
                    
                    Reservation.find({$and:[{from: {$lte: to}}, {to: {$gte: from}}] 
                    }, function(err, reservations){
                            if(err){
                                console.log(err);
                            }else{
                                var isReserved = reservations.reduce(function(acc,res){
                                    acc[res.itemId] = true;
                                    return acc;
                                }, {});
                                console.log(isReserved);
                                Item.find({}, function(err, allItems){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        var availables = allItems.filter(function(item){
                                            return isReserved[item._id] !== true;
                                        });
                                        console.log("availables are" + availables);
                                        var items = availables.concat(reservation);
                                        console.log("items" + items);
                                        res.render("editReservation", {batchId: batchId, reservations:reservations, items:items, inReservation:inReservation});
                                    }
                            });
                            }
                        });
                                    
                    }
                });
            }
    });
});
    
    
app.put("/reservation/:batchId", function(req,res){
    var ids = req.body.item;
    console.log(ids);
    var batchId = req.params.batchId;
    Reservation.remove({batchId: batchId}, function(err, removedReservations){
        if(err){
            console.log(err);
        }else{
            console.log("removedReservations: " + removedReservations);
            Item.find({_id: ids}, function(err, items){
                if(err){
                    console.log(err);
                }else{
                    var newBatchId = makeBatchId();
                    console.log("items: " + items);
                    items.forEach(function(item){
                         var reservation = {
                                               batchId: newBatchId,
                                               itemId: item._id,
                                               from: req.body.from,
                                               to: req.body.to,
                                               clientId: req.user._id
                                               };
                        Reservation.create(reservation, function(err, newReservation){
                            if(err){
                                console.log(err);
                            }else{
                                console.log(newReservation);
                            }
                        });
                    });
                    res.redirect("/reservation/" + newBatchId);
                }
            });
        }
    });
});
           
//ADMIN ROUTES

app.get("/admin", isLoggedIn, ifAdmin, function(req,res){
    
/*var reservationsWithItems = [];
    Reservation.find({}, function(err, reservations){
         Item.find({_id: {$in : reservations.map(function(res){return res.itemId})}},function(err, items) {
             var itemsByItemId = items.reduce(function(acc, item){
                 acc[item._id] = item;
                 return acc;
             }, {});
             console.log("items with ItemId" + itemsByItemId);
        reservationsWithItems = reservations.map(function(reservation){
                reservation.itemId = itemsByItemId[reservation.itemId];
               return reservation;
            });
         console.log("reservations with items" + JSON.stringify(reservationsWithItems, null, 2));
    }); 
    });*/
   
    
    Reservation.find({}).populate("itemId clientId").exec(function(err, reservations){
                        if(err){
                            console.log(err);
                        }else{
                            var reservationsByBatchId = reservations.reduce(function (acc, reservation) {
                                if (acc[reservation.batchId] === undefined) {
                                    acc[reservation.batchId] = [];
                                }
                                acc[reservation.batchId].push(reservation);
                                return acc;
                            }, {});
                            res.render("reservations", {reservationsByBatchId: reservationsByBatchId});
                            }
                        });
    });


app.post("/admin", isLoggedIn, ifAdmin, function(req,res){
    var client = "client=" + req.body.client + "&";
    var item = "item=" + req.body.item + "&";
    var dueDate = "dueDate=" + req.body.dueDate + "&";
    var URL = "/admin/search?" + client + item + dueDate;
    res.redirect(URL);
});

app.get("/admin/search", function(req,res){
    
    
    var client = req.query.client;
    var item = req.query.item;
    var dueDate = req.query.dueDate;
    var clientId;
    var itemId;
    var arr = [];
    
    if(dueDate !== ""){
        arr.push({"to": dueDate});
    }
    
    console.log("client is: " + client);
    console.log("item is: " + item);
    console.log("date is: " + dueDate);
    
    User.find({username: {$regex: client}}, function(err, users){
        if(err){
            console.log(err);
        }else{
            if(client !== ""){
                arr.push({"clientId": users[0]._id});
            }
            Item.find({title: {$regex: item}}, function(err, items){
                if(err){
                    console.log(err);
                }else{
                    if(item !== ""){
                        arr.push({"itemId": items[0]._id});
                    }
                    Reservation.find({$and: arr}).populate("itemId clientId").exec(function(err, reservations){
                        if(err){
                            console.log(err);
                                }else{
                                    var reservationsByBatchId = reservations.reduce(function(acc,res){
                                        if(acc[res.batchId]===undefined){
                                            acc[res.batchId] = [];
                                        }
                                        acc[res.batchId].push(res);
                                        return acc;
                                        },{});
                                        
                                    res.render("reservations", {reservationsByBatchId: reservationsByBatchId});
                                }
                    });
                }
            });
        }
    });
});
    

app.delete("/admin", isLoggedIn, ifAdmin, function(req,res){
    Reservation.remove({batchId: req.body.batchId}, function(err, removedReservations){
        if(err){
            console.log(err);
        }else{
             res.redirect("/admin");
             }
            });
        });

app.get("/admin/add", function(req,res){
    res.render("add");
});

app.post("/admin/add", function(req,res){
    var newItem = req.body.item;
    Item.create(newItem, function(err, item){
        if(err){
            console.log(err);
        }else{
            item.save();
            res.redirect("/catalog");
        }
    });
});

function ifAdmin(req,res,next){
    if(req.user.username == "admin"){
     return next();
    }else{
       res.redirect("/login");
    }
}

function makeBatchId()
        {
            var batchId = "";
            
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
            for( var i=0; i < 5; i++ )
                batchId += possible.charAt(Math.floor(Math.random() * possible.length));
        
            return batchId;
        } 

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("server started");
});

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in