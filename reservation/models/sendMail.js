var nodemailer = require("nodemailer");
var Admin = require("./admin");
var mongoose = require("mongoose");

function sendMail(){

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Admin.name,
        pass: 'mumbai2013'
    }
});

var mailOptions = {
                                from: Admin.email,
                                to: {id: {
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: "User"
                                            },
                                            email: String},
                                            
                                subject: 'Confirmation of your reservation',
                                text: 'Your reservation has been confirmed',
                                html: '<b>Hello world ?</b>' // html body
                              };
                            
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message %s sent: %s', info.messageId, info.response);
                            });
}
                            
module.exports = sendMail;