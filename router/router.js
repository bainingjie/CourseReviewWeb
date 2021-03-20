import Vue from "vue";
import Router from "vue-router";
import Course from "../src/components/Course";
import Questionary from "../src/components/Questionary";
import Home from "../src/components/Home";
import AddCourse from "../src/components/AddCourse";
import User from "../src/components/User";
import SellingForm from "../src/components/SellingForm"
import Note from "../src/components/Note";
import Login from "../src/components/Login";
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
        // $route.params.id 
        path: '/',
        name: "Home",
        component: Home
    },
    {
        // $route.params.id 
        path: '/course/:id',
        name: "Course",
        component: Course
    },
    {
        // $route.params.id 
        path: '/account',
        name: "User",
        component: User
    },
    {
        // $route.params.id 
        path: '/note/:id',
        name: "Note",
        component: Note
    },
    {
        // $route.params.id 
        path: '/add_course',
        name: "AddCourse",
        component: AddCourse
    },
    {
        // $route.params.id 
        path: '/course/:id/questionary',
        name: "Questionary",
        component: Questionary
    },
    {
        // $route.params.id 
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        // $route.params.id 
        path: '/selling/:id',
        name: "SellingForm",
        component: SellingForm
    }
  ]
});