const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    /*profile*/ 
    active:{type:Boolean,default:true},
    _id:String,
    name:String,
    university:String,
    department:String,
    subdepartment:String,
    enrollment_year:Number,
    email:String,

    /*viewable record*/
    bookmark_ids:[{type: Schema.Types.ObjectId, ref: 'Course'}],
    review_ids:[{type: Schema.Types.ObjectId, ref: 'Review'}],
    selling_note_ids:[{type: Schema.Types.ObjectId, ref: 'Note'}],
    bought_note_ids:[{type: Schema.Types.ObjectId, ref: 'Note'}],
    bought_note_reviewed:[Boolean],
    // review_ids 

    /* system record*/
    comment_laugh_ids:[Schema.Types.ObjectId],
    comment_good_ids:[Schema.Types.ObjectId]
});

module.exports = mongoose.model("User", userSchema);


