var mongoose = require("mongoose");

var reservationSchema = new mongoose.Schema({
                                        itemId: {
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: "Item"
                                            },
                                        batchId: String,
                                        from: String,
                                        to: String,
                                        clientId: {
                                                type: mongoose.Schema.Types.ObjectId,
                                                ref: "User"
                                            }
                                        });
                                        
module.exports = mongoose.model("Reservation", reservationSchema);