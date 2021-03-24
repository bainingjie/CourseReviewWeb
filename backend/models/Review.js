const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    courses_id:{ type: Schema.Types.ObjectId, ref: 'Course' },
    user:String,

    course_names:[String],
    tags:[String],

    selected_evaluation:[Number],

    point:Number,
    difficulty:Number,
    recommendation:Number,
    credit:Number,

    selected_good_texts: [String],
    selected_bad_texts: [String],
    selected_advice_texts: [String]
})

module.exports = mongoose.model("Review", reviewSchema);