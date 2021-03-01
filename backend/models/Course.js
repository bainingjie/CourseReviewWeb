const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    active:{type:Boolean,default:true},
    university:{type:String,index: true},
    course_name:{type:[String],index: true},
    lecturer:[String],
// favouriteFoods is an array
// PersonModel.find({ favouriteFoods: "sushi" }, ...);


    /*評価方法(show 過半数)*/
    selected_evaluation:{type:[Number],default:[0,0,0,0,0,0]},
    // attendance:{type:Number,default:0}, 
    // report:{type:Number,default:0},
    // final:{type:Number,default:0},
    // presentation:{type:Number,default:0},
    // quiz:{type:Number,default:0},
    // take_in:{type:Number,default:0},

    /*授業評価(show the most vote to avoid 外れ値)*/
    point:{type:[Number],default:[0,0,0,0,0]},
    difficulty:{type:[Number],default:[0,0,0,0]},
    recommendation:{type:[Number],default:[0,0,0,0,0]},

    credit:{type:[Number],default:[0,0,0,0,0]},
    // quality:{type:[Number],default:[0,0,0,0]},
    // professor_score:{type:[Number],default:[0,0,0,0]},

    /*タグ(show the most vote, top 10)*/
    good_tags: [{text:String,count:Number}],
    bad_tags: [{text:String,count:Number}],
    advice_tags: [{text:String,count:Number}],
    others_tags: [{text:String,count:Number}],    

    comment:{type:[{title:String,text:String,good_count:Number,laugh_count:Number,user:String,date:Date}],default:[]},
    // count_scorer:{type:Number,default:0},
    // comment:{type:[{text:String,good_count:Number,laugh_count:Number,user:String,date:Date}],default:[]},
    scorer:{type:[{department:String,subdepartment:String,class:String,year:String,count:Number}],default:[]},
    scorer_count:{type:Number,default:0}
})
/* define methods for schema*/

// courseSchema.index({university:1});
// courseSchema.index({course_name:1});
// courseSchema.index({lecturer:1});
// 以降は
// var course = new Course({name:,lecturer})

module.exports = mongoose.model("Course", courseSchema);