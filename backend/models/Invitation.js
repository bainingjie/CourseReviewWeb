const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    registered:{type:Boolean,default:false},
    code:String
});

module.exports = mongoose.model("Invitation", invitationSchema);


    

