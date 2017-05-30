var Item = require("./item");

function removeOldOnes(){
    var currentDay = new Date();
    var today = currentDay.toISOString().substring(0,16);
    console.log(today);
    Item.update({},{ $pull: { reserved: { to: {$lt:today}}}}, function(err, updatedItem){
        if(err){
            console.log(err);
        }else{
            console.log(updatedItem);
        }
    });
    console.log("updated");
}

module.exports = removeOldOnes;