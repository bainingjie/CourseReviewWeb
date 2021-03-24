const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const async = require('async');
const axios = require('axios');
const history = require('connect-history-api-fallback');
// const ObjectId = require('mongodb').ObjectID;

const app = express();
app.use(history());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* added after npm run build*/
app.use(express.static('../dist'));
app.use(express.static('../'));
// app.use(express.static('../index.html'));
// app.use(express.static('../css'));
// app.use(express.static('../js'));
// app.use(express.static('../favicon.ico'));

// app.get(/.*/,(req,res)=>res.sendFile(__dirname + '/../dist/index.html'));

const Course = require("./models/Course");
const Lecturer  =  require("./models/Lecturer");
const User = require("./models/User");
const Review = require("./models/Review");
const Note = require("./models/Note");
const Invitation = require('./models/Invitation');
const redirect_uri = 'https%3A%2F%2Fwww.cryrin.com%2Fredirect';
const redirect_uri_raw = "https://www.cryrin.com/redirect";
// connectOptionã¯mongooseã§ãƒ‡ãƒ¼ã‚¿ãƒ™ãƒ¼ã‚¹ã«æŽ¥ç¶šã™ã‚‹éš›ã«å‡ºã‚‹è­¦å‘Šã‚’é¿ã‘ã‚‹ãŸã‚æ›¸ã„ã¦ã„ã¾ã™ã€‚
const connectOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb://localhost/mydb", connectOption);




/* update evaluation,4points,4tags,comment */ 
function course_update_subfunction(req,course){
  req.body.selected_evaluation.forEach((element) => {course.selected_evaluation[element] += 1; });
  if(req.body.credit>-1 && req.body.credit< course.credit.length){
    course.credit[req.body.credit] += 1 ;
  }
  if(req.body.point>-1 && req.body.point<course.point.length){
    course.point[req.body.point] += 1;
  }
  if(req.body.difficulty>-1 && req.body.difficulty<course.difficulty.length){
    course.difficulty[req.body.difficulty] += 1;
  }
  if(req.body.recommendation>-1 && req.body.recommendation<course.recommendation.length){
    course.recommendation[req.body.recommendation] += 1;
  }
  course.markModified('credit');
  course.markModified('point');
  course.markModified('difficulty');
  course.markModified('recommendation');
  course.markModified('selected_evaluation');

  /* userã‹ã‚‰stringã‚’è²°ã†ã®ã¯ã€å›žç­”ä¸­ã«textã‚„countãŒè²·æ›¸ãæ›ãˆã‚‰ã‚Œã‚‹å¯èƒ½æ€§ãŒã‚ã‚‹ã‹ã‚‰*/ 
  req.body.selected_good_texts.forEach((text)=>{
    var index = course.good_tags.findIndex((ele)=>ele.text == text);
    if(index == -1){
      course.good_tags.push({text:text,count:1});
    }else{
      course.good_tags[index].count += 1;
    }
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

  req.body.selected_bad_texts.forEach((text)=>{
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

  req.body.selected_advice_texts.forEach((text)=>{
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

  if(req.body.comment.text.length >3){
    course.comment.push({title:req.body.comment.title,text:req.body.comment.text,good_count:0,laugh_count:0,user:req.body.user,date: new Date(),responses:[]}); 
  }
  course.markModified('good_tags');
  course.markModified('bad_tags');
  course.markModified('advice_tags');

  console.log("message_to_me: ",req.body.message_to_me);
  course.scorer_count += 1;
  course.markModified('scorer_count');
  return course;
}

function update_lecturer_course_subfunction(req,res,error,lecturer,course,obj,callback){
      if(error){
          console.log(error);
          return res.send("failed searching lecturer");
      }
      var new_lecturer;
      if (!lecturer){
          new_lecturer = new Lecturer({      
            university:req.body.university,
            kanji_alphabet:obj.kanji_alphabet,
            hira_kata:obj.hira_kata,
            name_combined:obj.kanji_alphabet.concat(obj.kata),
          });
          lecturer = new_lecturer;
      }

      if(lecturer.courses_id.findIndex(element => element.equals(course._id))==-1){
        lecturer.courses_id.push(course._id);
      }
      
      if(req.body.credit>-1 && req.body.credit<  lecturer.credit.length){
         lecturer.credit[req.body.credit] += 1 ;
      }
      if(req.body.point>-1 && req.body.point < lecturer.point.length){
         lecturer.point[req.body.point] += 1;
      }
      // course.quality[req.body.quality] += 1;
      if(req.body.difficulty>-1 && req.body.difficulty< lecturer.difficulty.length){
         lecturer.difficulty[req.body.difficulty] += 1;
      }
      if(req.body.recommendation>-1 && req.body.recommendation< lecturer.recommendation.length){
         lecturer.recommendation[req.body.recommendation] += 1;
      }

      if(course.lecturer_ids.findIndex(element => element.equals(lecturer._id))==-1){
        course.lecturer_ids.push(lecturer._id);
      }

      lecturer.scorer_count += 1;

      lecturer.markModified('scorer_count');
      lecturer.markModified('courses_id');
      lecturer.markModified('credit');
      lecturer.markModified('point');
      lecturer.markModified('difficulty');
      lecturer.markModified('recommendation');
      lecturer.save()
        .then((result)=>{
          // console.log('lecturer saved');
          // return res.send("lecturer saved successfully");
          callback();
        })
        .catch((error)=>{
          console.log(error);
          // return res.status(400).send("save lecturer failed");
        });
}

function add_course_function (req,res){
  let course = new Course({ 
    university:req.body.university,
    type:req.body.type,
   });
   req.body.course_names.forEach((name)=>{course.course_names.push({text:name,count:1})});
   req.body.tags.forEach((tag)=>{course.tags.push({text:tag,count:1})});
   //course = course_update_subfunction(req,course);
    async.eachSeries(req.body.lecturers, function updateObject (obj,callback) {
      Lecturer.findOne({university:req.body.university, name_combined:{ "$regex": obj.kanji_alphabet, "$options": "i" }},(error,lecturer)=>{
          update_lecturer_course_subfunction(req,res,error,lecturer,course,obj,callback);
        });
    }, function allDone (err) {
        // ã˜ã‚ƒãªã„ã¨lecture_idãŒpushã•ã‚Œã‚‹å‰ã«courseãŒsaveã•ã‚Œã¡ã‚ƒã†ã€‚
        course.markModified('lecturer_ids');
        course.save()
          .then((result)=> {
            return res.status(200).send("course saved successfully");
          })
          .catch((error)=>{
            console.log(error);
            return res.status(400).send("failed saving course");
          });

    });
}


// todo: update the questionary sumbmit params
function update_names_tags_subfunction(req,course){
  req.body.course_names.forEach((text)=>{
    var index = course.course_names.findIndex((ele)=>ele.text == text);
    if(index == -1){
      course.course_names.push({text:text,count:1});
    }else{
      course.course_names[index].count += 1;
    }
    /* sort */ 
    while(index >0){
      if(course.course_names[index].count > course.course_names[index-1].count){
        var temp = course.course_names[index-1];
        course.course_names[index-1]=course.course_names[index];
        course.course_names[index] = temp;
        index -= 1;
      }else{
        break;
      }
    }
  });

  req.body.tags.forEach((text)=>{
    var index = course.tags.findIndex((ele)=>ele.text == text);
    if(index == -1){
      course.tags.push({text:text,count:1});
    }else{
      course.tags[index].count += 1;
    }
    /* sort */ 
    while(index >0){
      if(course.tags[index].count > course.tags[index-1].count){
        var temp = course.tags[index-1];
        course.tags[index-1]=course.tags[index];
        course.tags[index] = temp;
        index -= 1;
      }else{
        break;
      }
    }
  });
  return course;
}
// ****** todo is left

/* save Review,Lecturer,Course,User */ 
function post_course_function(req,res){
    var objectId = mongoose.Types.ObjectId(req.params.id);
    Course.findById(objectId, function (error,course){
      if (error || course == null){
        return res.status(500).send("course was not found");
      }else{
        async.parallel([
            /* save review and user */ 
            function(callback){
              let review = new Review({
                courses_id:req.params.id,
                course_names:req.body.course_names,
                tags:req.body.tags,
                user:req.body.user,
                selected_evaluation:req.body.selected_evaluation,
                point:req.body.point,
                difficulty:req.body.difficulty,
                recommendation:req.body.recommendation,
                credit:req.body.credit,
                selected_good_texts:req.body.selected_good_texts,
                selected_bad_texts:req.body.selected_bad_texts,
                selected_advice_texts:req.body.selected_advice_texts
              });
              review.save().then((review)=>{
                    /* save user */ 
                    let user = User.findOne({_id:req.body.user},(err,usr)=>{
                          if(!err){
                            usr.review_ids.push(review._id);
                            usr.markModified('review_ids');
                            usr.save().then((result)=>{ callback(null);});
                          }
                    });
                    
              });              
            },

            /*save lectures*/ 
            function(callback) {
                async.eachSeries(course.lecturer_ids, function updateObject (obj,callback) {
                  Lecturer.findById(obj,(error,lecturer)=>{
                      update_lecturer_course_subfunction(req,res,error,lecturer,course,obj,callback);
                    });

                }, function allDone (err) {
                    if(!err){
                      callback(null);
                    }
                });
            },

            /* save course*/ 
            function(callback) {
              // course = update_names_tags_subfunction(req,course);
              course = course_update_subfunction(req,course);
              course.save()
                .then((result)=> {
                  callback(null);
                });
            }
        ],
        // optional callback
        function(err) {
            if(err){
              console.log(err);
            }else{
              return res.status(200).send("posted successfully");
            }
        });

      }
    });
}

/* å…¨ã¦ã®æŽˆæ¥­ã‚’getã™ã‚‹ */ 
app.get("/api_get_courses",(req,res)=>{
  Course.find()
  .populate('lecturer_ids','kanji_alphabet')
  .lean()
  .exec((err,result)=>{
    return res.status(200).json(result);
  })
});

/* æ–°ã—ã„æŽˆæ¥­ã‚’createã™ã‚‹ã€€*/ 
app.post("/api_add_course",add_course_function);

/* æŽˆæ¥­ã‚¢ãƒ³ã‚±ãƒ¼ãƒˆã‚’å—ã‘å–ã‚Šã€updateã™ã‚‹ã€€*/ 
app.post("/api_course/:id", post_course_function);

function button_subfunction(err,result,req,res,user){
      if (!err) {
        let index = result.comment.findIndex((ele)=>ele._id.equals(req.body.comment_id));
        if(req.body.good_or_laugh==1){
          result.comment[index].good_count += req.body.increment;
        }else{
          result.comment[index].laugh_count += req.body.increment;
        }
        result.save()          
            .then((save_result)=> {
              user.markModified('comment_laugh_ids');
              user.markModified('comment_good_ids');
              user.save().then((save_result)=>{return res.status(200).send( "succeeded saving course");});
            })
            .catch((error)=>{
              console.log(error);
              return res.status(400).send( "save course failed");
            }); } else {
      return res.status(500).send("can't get the course information ");
    }
}

/* ã‚³ãƒ¡ãƒ³ãƒˆã®ãƒœã‚¿ãƒ³ã€€*/ 
app.post("/api_button",(req,res)=>{
  User.findOne({_id:req.body.user},(err,user)=>{
    if(!err){
      // clicked
      if(req.body.increment==1 ){
        if(req.body.good_or_laugh==1 && user.comment_good_ids.findIndex((ele)=>ele.equals(req.body.comment_id))==-1){
            user.comment_good_ids.push(req.body.comment_id);
            Course.findById(req.body.id,(err, result)=> {
              button_subfunction(err,result,req,res,user);
            });
        }else if (req.body.good_or_laugh !=1 && user.comment_laugh_ids.findIndex((ele)=>ele.equals(req.body.comment_id))==-1){
            user.comment_laugh_ids.push(req.body.comment_id);
            Course.findById(req.body.id,(err, result)=> {
              button_subfunction(err,result,req,res,user);
            });
        }else{
          return res.status(400).send('dont increment after increment');
        }
      // unclicked
      }else if(req.body.increment == -1){
        let good_index = user.comment_good_ids.findIndex((ele)=>ele.equals(req.body.comment_id));
        let laugh_index = user.comment_laugh_ids.findIndex((ele)=>ele.equals(req.body.comment_id));
        if(req.body.good_or_laugh==1 && good_index> -1){
            user.comment_good_ids.splice(good_index, 1);
            Course.findById(req.body.id,(err, result)=> {
              button_subfunction(err,result,req,res,user);
            });
        }else if (req.body.good_or_laugh !=1 && laugh_index >-1){
            user.comment_laugh_ids.splice(laugh_index, 1);
            Course.findById(req.body.id,(err, result)=> {
              button_subfunction(err,result,req,res,user);
            });    
        }else{
          return res.status(400).send('dont decrement before increment');
        }
      }
    }else{
      console.log("comment button was pressed unsuccessfully");
      return res.send(400, "comment button was pressed unsuccessfully");
    }
  });
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
/* create invitation code */ 
app.post("/api_add_code",(req,res)=>{
  let invitation = new Invitation({
    code:makeid(8)
  });
  console.log(makeid(8));
  invitation.save()
  .then((result)=>{return res.json(result)})
  .catch((err)=>{return res.status(500).send("can't save ");})
});

/* check invitation code*/
app.post('/api_invitation_code',(req,res)=>{
    Invitation.findOne({registered:false,code:req.body.code})
    .exec((err,result)=>{    
      if (!err) {
        // result.registered=true;
        if(result == null){
          return res.status(500).send('code not found');
        }else{
          return res.json({url:'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655685733&redirect_uri='+redirect_uri+'&state='+req.body.state+'&scope=profile%20openid&nonce=09876xyz'});
        }
      } else {
        return res.status(500).send("invitation code error");
      }
    });
});

app.post("/api_disable_inv_code",(req,res)=>{
    Invitation.findOne({registered:false,code:req.body.code})
    .exec((err,result)=>{    
      if (!err) {
        if(result == null){
          return res.status(500).send('code not found');
        }else{
          result.registered=true;
    result.markModified('registered');
          result.save().then((newres)=>{return res.status(200).send('succeeded');}).catch((err)=>{
            console.log(err);
            return res.status(500).send("failed to save");});
        }
      } else {
        return res.status(500).send("invitation code error");
      }
    });
});

/* get course data by id*/
app.get("/api_course/:id", (req, res) => {
  // using find instead of findOne will return a list, even when there is only one result
  var objectId = mongoose.Types.ObjectId(req.params.id);
  Course.findById(objectId)
  .populate('lecturer_ids','kanji_alphabet _id')
  .populate('notes','title _id active url')
  .lean()
  .exec((err,result)=>{    
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).send("can't get the course information ");
    }
  });
});


app.post("/api_add_note",(req,res)=>{
  let note = new Note({
    course_id:req.body.course_id,
    title:req.body.title,
    description:req.body.description,
    date:new Date(),
    url:req.body.url
  });
async.parallel([
          /* save review and user */ 
          function(callback){
      console.log(req.course_id);
                Course.findById(req.body.course_id,(err,course)=>{
                        if(!err){
                   
                    console.log(course._id);
                                  course.notes.push(note._id);
                                  course.markModified('notes');
                                  course.save().then((result)=>{callback(null);});
                                }
                      });            
              },
          /*save lectures*/ 
          function(callback) {
                note.save().then((result)=>{callback(null);});
              }
      ],
      // optional callback
       function(err) {
               if(err){
                         console.log(err);
                                 }else{
                                           return res.status(200).send("posted successfully");
                                                   }
                                                       });
});

/* get note data by id*/
app.get("/api_note/:id",(req,res)=>{
  // using find instead of findOne will return a list, even when there is only one result
  var objectId = mongoose.Types.ObjectId(req.params.id);
  Note.findById(objectId)
  .lean()
  .exec((err,result)=>{    
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).send("can't get the note information ");
    }
  });
});

/* ã‚¢ãƒ³ã‚±ãƒ¼ãƒˆå›žç­”pageã®get */ 
app.get("/api_course/:id/questionary", (req, res) => {
  // using find instead of findOne will return a list, even when there is only one result
  var objectId = mongoose.Types.ObjectId(req.params.id);
  Course.findOne({_id: objectId})
  .populate('lecturer_ids','kanji_alphabet')
  .lean()
  .exec((err, result)=> {
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
  Lecturer.find({university:search_university,name_combined: { "$regex": search_by_lecturer, "$options": "i" }})
  .limit(50)
  .populate('courses_id','course_names _id')
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
  Course.find({university:search_university,'course_names.text': { "$regex": search_course_name, "$options": "i" }},"_id course_names lecturer_ids recommendation point difficulty credit lecturer_ids")
  // sortã‚‚ã§ãã‚‹
  .limit(50)
  .populate('lecturer_ids','kanji_alphabet')
  .lean()
  .exec((err,result)=>{    
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).send("can't get the course information ");
    }
  });
});

app.post("/api_check_user",(req,res)=>{
  User.findOne({_id:req.body.user},(err,user)=>{
    if(!err){
      if(!user){
        return res.status(200).json({exists:false});
      }else{
        return res.status(200).json({exists:true,nickname:user.name});
      }
    }
  });
});

app.post("/api_create_user",(req,res)=>{
  console.log(req.body);
  User.findOne({_id:req.body.user},(err,user)=>{
    if(!err){
      if(!user){
        user = new User({ 
            _id:req.body.user,
            name:req.body.name,
            university:req.body.university,
            department:req.body.department,
            subdepartment:req.body.subdepartment,
            enrollment_year:Number(req.body.enrollment_year),
            email:req.body.email
            // user_id:req.body.user
        });
        user.save()
        .then((result)=>{
          return res.status(200).send("user was created");
        })
        .catch((error)=>{
          console.log(error);
          return res.status(400).send("failed to create user");
        });
        
      }else{
        return res.status(200).send("user already exists");
      }
    }else{
      console.log(err);
      return res.status(400).send("failed finding user");
    }
  });
});

app.post("/api_line_login",(req,res)=>{
  var params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', req.body.code)
  params.append('redirect_uri', redirect_uri_raw)
  params.append('client_id', '1655685733')
  params.append('client_secret','bd56354f0e85e712e201068150fda07e')

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  axios.post("https://api.line.me/oauth2/v2.1/token", params, config)
    .then((result) => {
      // console.log(result);
      params = new URLSearchParams()
      params.append('id_token', result.data.id_token)
      params.append('client_id', '1655685733')

      axios.post("https://api.line.me/oauth2/v2.1/verify",params).then((result)=>{
        // console.log(result);
        return res.status(200).send({user_id:result.data.sub});
      })
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("failed to login");
    })
});

app.get("/api_note_password",(req,res)=>{
  return res.status(200).json({password:'test'});
});

app.listen(process.env.PORT || 3000);