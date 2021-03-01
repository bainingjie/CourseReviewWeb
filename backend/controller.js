const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const ObjectId = require('mongodb').ObjectID;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* added after npm run build*/
// app.use(express.static('../dist'));
app.use(express.static('../'));
// app.use(express.static('../index.html'));
// app.use(express.static('../css'));
// app.use(express.static('../js'));
// app.use(express.static('../favicon.ico'));

// app.get(/.*/,(req,res)=>res.sendFile(__dirname + '/../dist/index.html'));

const Course = require("./models/Course");
const Lecturer  =  require("./models/Lecturer");
// connectOptionはmongooseでデータベースに接続する際に出る警告を避けるため書いています。
const connectOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb://localhost/mydb", connectOption);



/* 新しい授業をcreateする　*/ 

app.post("/api_add_course", function(req,res){
    const course = new Course({ 
      university:req.body.university,
      course_name:req.body.course_name,
      lecturer:req.body.lecturer
     });

    req.body.selected_evaluation.forEach((element) => {course.selected_evaluation[element] += 1; });
    course.credit[req.body.credit] += 1 ;
    course.point[req.body.point] += 1;
    // course.quality[req.body.quality] += 1;
    course.difficulty[req.body.difficulty] += 1;
    course.recommendation[req.body.recommendation] += 1;
    // course.professor_score[req.body.professor_score] += 1;

        /* userからstringを貰うのは、回答中にtextやcountが買書き換えられる可能性があるから*/ 
        req.body.selected_good_texts.forEach(text=>{
          course.good_tags.push({text:text,count:1});
        });

        req.body.selected_bad_texts.forEach(text=>{
          course.bad_tags.push({text:text,count:1});
        });

        req.body.selected_others_texts.forEach(text=>{
          course.others_tags.push({text:text,count:1});
        });

        req.body.selected_advice_texts.forEach(text=>{
          course.advice_tags.push({text:text,count:1});
        });
      if(req.body.comment.length>0){
        course.comment.push({text:req.body.comment,good_count:0,laugh_count:0,user:req.body.user,date: new Date()});
      }

     course.lecturer.forEach((lect)=>{
      Lecturer.findOne({lecturer:lect},(error,lecturer)=>{
          if(error){
              console.log(error);
              return res.send("search lecturer failed");
          }
          var new_lecturer;
          if (!lecturer){
              // console.log("here");
              // console.log(req.body.lecturer);
              new_lecturer = new Lecturer({      
                university:req.body.university,
                lecturer: req.body.lecturer[0],
                // course_name: ['hey']
              });
              lecturer = new_lecturer;
              // console.log(new_lecturer.lecturer);
              // console.log(new_lecturer.courses_name);
          }
          // console.log(new_lecturer.lecturer);
          // console.log(new_lecturer.course_name);
          // console.log('here');
          lecturer.courses_name.push(req.body.course_name[0]);
          lecturer.courses_id.push(course._id);
          // console.log('credit index: ',req.body.credit);
          lecturer.credit[req.body.credit] += 1;
          lecturer.point[req.body.point] += 1;
          lecturer.difficulty[req.body.difficulty] += 1;
          lecturer.recommendation[req.body.recommendation] += 1;
          lecturer.markModified('credit');
          lecturer.markModified('point');
          lecturer.markModified('difficulty');
          lecturer.markModified('recommendation');
          lecturer.save()
            .then((result)=>{
              // console.log('lecturer saved');
              // return res.send("lecturer saved successfully");
            })
            .catch((error)=>{
              console.log(error);
              return res.status(400).send("save lecturer failed");
            });
        });
    });

    // console.log(course);
    course.save()
      .then((result)=> {
        // console.log('course saved');
        // return res.json(course);
        return res.status(200).send("course saved successfully");
      })
      .catch((error)=>{
        console.log(error);
        return res.status(400).send("save failed");
      });

});

/* 授業アンケートを受け取り、updateする　*/ 
app.post("/api_course/:id", async function(req,res){
    var objectId = mongoose.Types.ObjectId(req.params.id);
    Course.findById(objectId, async function (error,course){
      if (error || course == null){
        return res.status(500).send("course not found");
      }else{
        // console.log("here1");
        req.body.selected_evaluation.forEach((element) => {course.selected_evaluation[element] += 1; });
        if(req.body.credit>-1 && req.body.credit< course.credit.length){
          course.credit[req.body.credit] += 1 ;
        }
        if(req.body.point>-1 && req.body.point<course.point.length){
          course.point[req.body.point] += 1;
        }
        // course.quality[req.body.quality] += 1;
        if(req.body.difficulty>-1 && req.body.difficulty<course.difficulty.length){
          course.difficulty[req.body.difficulty] += 1;
        }
        if(req.body.recommendation>-1 && req.body.recommendation<course.recommendation.length){
          course.recommendation[req.body.recommendation] += 1;
        }
        // course.professor_score[req.body.professor_score] += 1;
        course.markModified('credit');
        course.markModified('point');
        course.markModified('difficulty');
        course.markModified('recommendation');
        course.markModified('selected_evaluation');
        /* userからstringを貰うのは、回答中にtextやcountが買書き換えられる可能性があるから*/ 
        req.body.selected_good_texts.forEach(text=>{
          var index = course.good_tags.findIndex((ele)=>ele.text == text);
          if(index == -1){
            course.good_tags.push({text:text,count:1});
          }else{
            course.good_tags[index].count += 1;
          }
        // console.log("here2");
          /* sort */ 
          while(index >0){
            if(course.good_tags[index].count > course.good_tags[index-1].count){
              var temp = course.good_tags[index-1];
              course.good_tags[index-1]=course.good_tags[index];
              course.good_tags[index] = temp;
              index -= 1;
            }else{
              break;
            }
          }
        });

        req.body.selected_bad_texts.forEach(text=>{
          var index = course.bad_tags.findIndex((ele)=>ele.text == text);
          if(index == -1){
            course.bad_tags.push({text:text,count:1});
          }else{
            course.bad_tags[index].count += 1;
          }
          /* sort */ 
          while(index >0){
            if(course.bad_tags[index].count > course.bad_tags[index-1].count){
              var temp = course.bad_tags[index-1];
              course.bad_tags[index-1]=course.bad_tags[index];
              course.bad_tags[index] = temp;
              index -= 1;
            }else{
              break;
            }
          }
        });

        req.body.selected_others_texts.forEach(text=>{
          var index = course.others_tags.findIndex((ele)=>ele.text == text);
          if(index == -1){
            course.others_tags.push({text:text,count:1});
          }else{
            course.others_tags[index].count += 1;
          }
          /* sort */ 
          while(index >0){
            if(course.others_tags[index].count > course.others_tags[index-1].count){
              var temp = course.others_tags[index-1];
              course.others_tags[index-1]=course.others_tags[index];
              course.others_tags[index] = temp;
              index -= 1;
            }else{
              break;
            }
          }
        });

        req.body.selected_advice_texts.forEach(text=>{
          var index = course.advice_tags.findIndex((ele)=>ele.text == text);
          if(index == -1){
            course.advice_tags.push({text:text,count:1});
          }else{
            course.advice_tags[index].count += 1;
          }
          /* sort */ 
          while(index >0){
            if(course.advice_tags[index].count > course.advice_tags[index-1].count){
              var temp = course.advice_tags[index-1];
              course.advice_tags[index-1]=course.advice_tags[index];
              course.advice_tags[index] = temp;
              index -= 1;
            }else{
              break;
            }
          }
        });

        if(req.body.comment.length >3){
          course.comment.push({text:req.body.comment,good_count:0,laugh_count:0,user:req.body.user,date: new Date()}); 
        }
        course.markModified('good_tags');
        course.markModified('bad_tags');
        course.markModified('others_tags');
        course.markModified('advice_tags');
        /* todo :manipulate scorer*/    
        // var scorer_index = course.scorer.indexOf(req.body.scorer);
        // if(scorer_index == -1){
        //   course.scorer.push(req.body.scorer);
        //   course.scorer_count.push(1);
        // }else{
        //   course.scorer_count[scorer_index] += 1;
        // }

        console.log("message_to_me: ",req.body.message_to_me);
        course.scorer_count += 1;
        course.markModified('scorer_count');
        /* manipulate Lecture model*/ 
        
        course.lecturer.forEach((lect)=>{
          Lecturer.findOne({lecturer:lect},(error,result)=>{
          if (error || result == null){
            return res.status(500).send("lecturer doesn't exist.");
          }else{
            if(req.body.credit>-1 && req.body.credit<  result.credit.length){
               result.credit[req.body.credit] += 1 ;
            }
            if(req.body.point>-1 && req.body.point < result.point.length){
               result.point[req.body.point] += 1;
            }
            // course.quality[req.body.quality] += 1;
            if(req.body.difficulty>-1 && req.body.difficulty< result.difficulty.length){
               result.difficulty[req.body.difficulty] += 1;
            }
            if(req.body.recommendation>-1 && req.body.recommendation< result.recommendation.length){
               result.recommendation[req.body.recommendation] += 1;
            }
            // result.credit[req.body.credit] += 1;
            // result.point[req.body.point] += 1;
            // result.difficulty[req.body.difficulty] += 1;
            // result.recommendation[req.body.recommendation] += 1;
            result.markModified('credit');
            result.markModified('point');
            result.markModified('difficulty');
            result.markModified('recommendation');
          }
          // console.log("before saving result of ",result.lecturer);
          result.save()
            .then((result)=>{
              // console.log("here3");
              return res.status(200).send("saved lecturer successfully");
            })
            .catch((error)=>{
              console.log(error);
              return res.send(400, "failed to save lecturer");
            });
          });
        });
        
        course.save()
          .then((result)=> {
            console.log("course saved successfully");
            // return res.status(200).send("saved course successfully");
          })
          .catch((error)=>{
            console.log(error);
            // return res.send(400, "save course failed");
          });
      }
    });

});

app.post("/api_button",(req,res)=>{
  Course.findOne({_id:req.body.id},(err, result)=> {
    if (!err) {
      if(req.body.good_or_laugh==1){
        result.comment[req.body.index].good_count += req.body.increment;
      }else{
        result.comment[req.body.index].laugh_count += req.body.increment;
      }
      result.save()          
          .then((save_result)=> {return res.json(result);})
          .catch((error)=>{
            console.log(error);
            return res.send(400, "save course failed");
          });
    } else {
      return res.status(500).send("can't get the course information ");
    }
  });
});


app.get("/api_course/:id", (req, res) => {
  // using find instead of findOne will return a list, even when there is only one result
  var objectId = mongoose.Types.ObjectId(req.params.id);
  Course.findOne({_id: objectId},(err, result)=> {
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).send("can't get the course information ");
    }
  });
});


/* アンケート回答pageのget */ 
app.get("/api_course/:id/questionary", (req, res) => {
  // using find instead of findOne will return a list, even when there is only one result
  var objectId = mongoose.Types.ObjectId(req.params.id);
  Course.findOne({_id: objectId},"_id university course_name lecturer selected_evaluation good_tags bad_tags advice_tags others_tags ",(err, result)=> {
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).send("can't get the course information ");
    }
  });
});


app.get("/api_search_by_lecturer", (req, res) => {
  // console.log(req.query);
  var search_university = req.query.search_university;
  var search_by_lecturer = req.query.search_lecturer_name;
  Lecturer.find({university:search_university,lecturer: { "$regex": search_by_lecturer, "$options": "i" }})
  .limit(50)
  .lean()
  .exec((err,result)=>{    
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).send("can't get the course information ");
    }
  });
});


app.get("/api_search_by_class", (req, res) => {
  var search_university = req.query.search_university;
  var search_course_name = req.query.search_course_name;
  // active:true
  Course.find({university:search_university,course_name: { "$regex": search_course_name, "$options": "i" }},"_id course_name lecturer recommendation point difficulty")
  // sortもできる
  .limit(50)
  .lean()
  .exec((err,result)=>{    
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).send("can't get the course information ");
    }
  });
});

app.listen(process.env.PORT || 3000);