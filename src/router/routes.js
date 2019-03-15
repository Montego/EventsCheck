import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../components/pages/Main";
import Profile from "../components/pages/Profile";
import E404 from "../components/pages/E404";
import UserList from "../components/pages/UserList";


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
    path:'/user-list/:id',
    component: UserList
  },
  {
    name:'profile',
    path:'/profile',
    component: Profile
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
