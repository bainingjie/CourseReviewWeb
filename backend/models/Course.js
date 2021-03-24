const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    active:{type:Boolean,default:true},
    university:String,
    course_names:[{text:String,count:Number}],
    lecturer_ids:[{ type: Schema.Types.ObjectId, ref: 'Lecturer' }],

    /* 所属、科目類、必修など */ 
    tags:[{text:String,count:Number}],
    type:Number,
    
    /*評価方法(show 過半数)*/
    selected_evaluation:{type:[Number],default:[0,0,0,0,0,0,0]},
    /*授業評価(show the most vote to avoid 外れ値)*/
    point:{type:[Number],default:[0,0,0,0,0]},
    difficulty:{type:[Number],default:[0,0,0,0]},
    recommendation:{type:[Number],default:[0,0,0,0]},
    credit:{type:[Number],default:[0,0,0,0,0]},
    /*タグ(show the most vote, top 10)*/
    good_tags: [{text:String,count:Number}],
    bad_tags: [{text:String,count:Number}],
    advice_tags: [{text:String,count:Number}],
  
    comment:[{title:String,text:String,good_count:Number,laugh_count:Number,bad_count:Number,user:String,date:Date,responses:[Schema.Types.ObjectId]}],

    scorer_count:{type:Number,default:0},
    bookmark_count:{type:Number,default:0},

    /*販売情報*/ 
    notes:[{type: Schema.Types.ObjectId, ref: 'Note'}]  
})

module.exports = mongoose.model("Course", courseSchema);

// favouriteFoods is an array
// PersonModel.find({ favouriteFoods: "sushi" }, ...);