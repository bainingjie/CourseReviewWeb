const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
    names:[{text:String,count:Number}]
});

module.exports = mongoose.model("Test", testSchema);