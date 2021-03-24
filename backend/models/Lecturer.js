const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    active:{type:Boolean,default:true},
    university:{type:String,index: true},

    kanji_alphabet:String,
    hira_kata:String,
    /* used for searching*/ 
    name_combined:{type:String,index: true},

    courses_id:[{ type: Schema.Types.ObjectId, ref: 'Course' }],
    credit:{type:[Number],default:[0,0,0,0,0]},
    point:{type:[Number],default:[0,0,0,0,0]},
    difficulty:{type:[Number],default:[0,0,0,0]},
    recommendation:{type:[Number],default:[0,0,0,0,0]},
    scorer_count:{type:Number,default:0}
});

module.exports = mongoose.model("Lecturer", lecturerSchema);