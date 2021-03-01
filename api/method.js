import Api from "./axios_connection";

export default {
  getCoursesData(id) {
    return Api().get("/api_course/"+id);
  },
  getCoursesDataQuestionary(id) {
    return Api().get("/api_course/"+id+'/questionary');
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
    return Api().post("/api_button/",buttonData);
  },
  searchByClass(search_object){
    return Api().get("/api_search_by_class",{params:{
        search_course_name:search_object.search_course_name,
        search_university:search_object.search_university
    }});
    // .then(function (response) {
    //     console.log(response);
    // })
  },
  searchByLecturer(search_object){
    // console.log(lecturer_name_obj);
    return Api().get("/api_search_by_lecturer",{params:{
        search_lecturer_name:search_object.search_lecturer_name,
        search_university:search_object.search_university
    }});
  }
};