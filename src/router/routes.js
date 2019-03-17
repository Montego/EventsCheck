import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../components/pages/Main";
import Profile from "../components/pages/Profile";
import E404 from "../components/pages/E404";
import Employers from "../components/pages/Employers";
import Calendar from "../components/pages/Calendar";
import Tabel from "../components/pages/Tabel";
import Events from "../components/pages/Events";


Vue.use(VueRouter);

const routes = [
  {
    path:'',
    redirect: {name :'main'}
  },
  {
    name:'main',
    path:'/main',
    component: Main
  },
  {
    name:'employers',
    path:'/employers',
    component: Employers
  },
  {
    name:'events',
    path:'/events',
    component: Events
  },
  {
    name:'tabel',
    path:'/tabel',
    component: Tabel
  },
  // {
  //   path:'/employers/:id',
  //   component: Employers
  // },
  {
    name:'profile',
    path:'/profile',
    component: Profile
  },
  {
    name:'calendar',
    path:'/calendar',
    component: Calendar
  },
  {
    path:'*',
    component: E404
  }
];

export const router =  new VueRouter({
  routes,
  mode: 'history'
});
