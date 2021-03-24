import Api from "./axios_connection";

export default {
  getCoursesData(id) {
    return Api().get("/api_course/"+id);
  },
  getCoursesDataQuestionary(id) {
    return Api().get("/api_course/"+id+'/questionary');
  },
  getNote(id){
    return Api().get("/api_note/"+id);
  },
  postCoursesData(id,course) {
    return Api().post("/api_course/"+id,course);
    // .then(function (response) {
    //     console.log(response);
    // })
  },
  addCourse(course) {
    return Api().post("/api_add_course/",course)
    .then(function (response) {
        console.log(response);
    })
  },
  buttonClicked(buttonData){
    console.log(buttonData);
    return Api().post("/api_button/",buttonData);
  },
  searchByClass(search_object){
    return Api().get("/api_search_by_class",{params:{
        search_course_name:search_object.search_course_name,
        search_university:search_object.search_university
    }});
  },
  disableInvCode(obj){
    return Api().post("/api_disable_inv_code",obj);
  },
  // login(){
  //   return Api().get("/api_search_by_class",{params:{
  //       search_course_name:search_object.search_course_name,
  //       search_university:search_object.search_university
  //   }});
  // },
  checkInvitation(obj){
    return Api().post("/api_invitation_code",obj);
  },

  LineApiLogin(obj){
    return Api().post("/api_line_login",obj);
  },

  createUser(obj){
    return Api().post("/api_create_user",obj);
  },
  checkUser(user_id){
    return Api().post("/api_check_user",{user:user_id});
  },
  getNotePassword(){
    return Api().get("/api_note_password");
  },
  getCourses(){
    return Api().get("/api_get_courses");
  },
  searchByLecturer(search_object){
    // console.log(lecturer_name_obj);
    return Api().get("/api_search_by_lecturer",{params:{
        search_lecturer_name:search_object.search_lecturer_name,
        search_university:search_object.search_university
    }});
  }
};