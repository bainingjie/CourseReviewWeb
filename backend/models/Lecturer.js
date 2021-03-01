const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    active:{type:Boolean,default:true},
    university:{type:String,index: true},
    lecturer:{type:String,index: true},
    mainID:String,
    /* only record the course_name[0] */ 
    courses_name:{type:[String],default:[]},
    courses_id:[{ type: Schema.Types.ObjectId, ref: 'Course' }],
    /*授業評価(show the most vote to avoid 外れ値)*/
    credit:{type:[Number],default:[0,0,0,0,0]},
    point:{type:[Number],default:[0,0,0,0,0]},
    difficulty:{type:[Number],default:[0,0,0,0]},
    recommendation:{type:[Number],default:[0,0,0,0,0]}
    // professor_score:{type:[Number],default:[0,0,0,0]},

});

module.exports = mongoose.model("Lecturer", lecturerSchema);