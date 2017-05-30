var Item = require("./item");
var User = require("./user");

var data = [
    {
        title: "Canon 5D",
        category: "Camera",
        priceHour: 10,
    },
    {
        title: "Broncolor 500",
        category: "Lights",
        priceHour: 12,
    },
    {
        title: "C-stand",
        category: "Stands",
        priceHour: 3,
    },
    {
        title: "Sony A7s",
        category: "Camera",
        priceHour: 10,
    },
    {
        title: "Elinchrome 500",
        category: "Lights",
        priceHour: 13,
    },
    {
        title: "Manfrotto",
        category: "Stands",
        priceHour: 3,
    },
    {
        title: "RED Dragon",
        category: "Camera",
        priceHour: 50,
    },
    {
        title: "HMI 500w",
        category: "Lights",
        priceHour: 12,
    },
    {
        title: "Boom-pole",
        category: "Stands",
        priceHour: 5,
    },
    {
        title: "Arri Alexa",
        category: "Camera",
        priceHour: 100,
    },
    {
        title: "Arri 2kw Fresnel",
        category: "Lights",
        priceHour: 12,
    },
    {
        title: "Sony FS7",
        category: "Camera",
        priceHour: 40,
    },
    {
        title: "The Light Velvet",
        category: "Lights",
        priceHour: 8,
    },
    {
        title: "Dedo-light 175w",
        category: "Lights",
        priceHour: 20,
    },
    {
        title: "Canon 7D",
        category: "Camera",
        priceHour: 6,
    },
    {
        title: "Joker Bug 1kW",
        category: "Lights",
        priceHour: 25,
    },
    {
        title: "Go-Pro",
        category: "Camera",
        priceHour: 10,
    },
    {
        title: "Kinoflo 4x4",
        category: "Lights",
        priceHour: 6,
    },
    {
        title: "Phantom",
        category: "Camera",
        priceHour: 150,
    },
    {
        title: "Kinoflo 2x2",
        category: "Lights",
        priceHour: 8,
    },
    {
        title: "C-stand",
        category: "Stands",
        priceHour: 3,
    },
    {
        title: "Canon 5D",
        category: "Camera",
        priceHour: 10,
    },
    {
        title: "Broncolor 500",
        category: "Lights",
        priceHour: 12,
    },
    {
        title: "C-stand",
        category: "Stands",
        priceHour: 3,
    },
    {
        title: "Canon 5D",
        category: "Camera",
        priceHour: 10,
    },
    {
        title: "Broncolor 500",
        category: "Lights",
        priceHour: 12,
    },
    {
        title: "C-stand",
        category: "Stands",
        priceHour: 3,
    },
    
];

function seedDB(){
   
   Item.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed items!");
         //add a few items
        data.forEach(function(item){
            Item.create(item, function(err, item){
                if(err){
                    console.log(err);
                } else {
                    console.log("added an item");
                        }
            });
        });
    });
    
    
    /*User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed admins!");
         //add a new admin
            Admin.create({}, function(err, newAdmin){
                if(err){
                    console.log(err);
                } else {
                    newAdmin.name = "Rental House";
                    newAdmin.email = "oskari.polho@gmail.com";
                    newAdmin.password = "KaksitoistaR3kkaa";
                    newAdmin.save();
                    console.log("added an admin");
                        }
            });
        });*/
  
}

module.exports = seedDB;