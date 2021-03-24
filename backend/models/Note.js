const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    active:{type:Boolean,default:true},
    course_id:{type: Schema.Types.ObjectId, ref: 'Course'},
    title:String,
    description:String,
    date:Date,
    url:String,
    comment:{type:[{text:String,user:String,date:Date}],default:[]},
});

module.exports = mongoose.model("Note", noteSchema);


    