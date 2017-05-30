var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    admin: Boolean
    });
    
UserSchema.plugin(passportLocalMongoose);
    
module.exports = mongoose.model("User", UserSchema);