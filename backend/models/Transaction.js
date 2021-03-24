/* temporary */ 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    note_id:{type: Schema.Types.ObjectId, ref: 'Note'},
    buyer:String,
    price:Number,
    date:Date,
});

module.exports = mongoose.model("Transaction", transactionSchema);