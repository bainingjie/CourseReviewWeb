import Vue from "vue";
import Router from "vue-router";
import Course from "../src/components/Course";
import Questionary from "../src/components/Questionary";
import Home from "../src/components/Home";
import AddCourse from "../src/components/AddCourse";
// import User from "../src/components/User";
// import SellingForm from "../src/components/SellingForm"
import Note from "../src/components/Note";
import Register from "../src/components/Register";
// import Login from "../src/components/Login";
import Redirect from "../src/components/Redirect";
import Search from "../src/components/Search";
import PlzLogin from "../src/components/PlzLogin";
import Store from '../store/index.js'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
        // $route.params.id 
        path: '/',
        name: "Home",
        component: Home,
        meta: {
          isPublic: true
        }
    },
    {
        // $route.params.id 
        path: '/register',
        name: "Register",
        component: Register,
        meta: {
          isPublic: true
        }
    },
    // {
    //     // $route.params.id 
    //     path: '/login',
    //     name: "Login",
    //     component: Login,
    //     meta: {
    //       isPublic: true
    //     }
    // },
    {
        // $route.params.id 
        path: '/plslogin',
        name: "PlzLogin",
        component: PlzLogin,
        meta: {
          isPublic: true
        }
    },
    {
        // $route.params.id 
        path: '/redirect',
        name: "Redirect",
        component: Redirect,
        meta: {
          isPublic: true
        }
    },
    {
        // $route.params.id 
        path: '/course/:id',
        name: "Course",
        component: Course
    },
    // {
    //     // $route.params.id 
    //     path: '/account',
    //     name: "User",
    //     component: User
    // },
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
        path: '/search',
        name: "Search",
        component: Search
    },
    // {
    //     // $route.params.id 
    //     path: '/selling/:id',
    //     name: "SellingForm",
    //     component: SellingForm
    // }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(page => page.meta.isPublic) || Store.state.logged_in) {
    next()
  } else {
    next('/plslogin')
  }
})

export default router