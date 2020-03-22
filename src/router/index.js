import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import User from "../pages/User.vue";
import Edit from "../pages/Edit.vue";
import Myfollow from "../pages/Myfollow.vue";
import Mycomments from "../pages/Mycomments.vue";
import Mystar from '../pages/Mystar.vue'
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", component: Login },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/user", name: "user", component: User },
    { path: "/edit", name: "edit", component: Edit },
    { path: "/my-follow", name: "my-follow", component: Myfollow },
    { path: "/my-comments", name: "my-comments", component: Mycomments },
    { path: "/my-star", name: "my-star", component: Mystar }
  ]
});

router.beforeEach(function(to, from, next) {
  // console.log('to',to)
  // console.log('from',from)
  const authUrl = ["/user", "/edit",'/my-follow','my-comments','my-star'];
  const token = localStorage.getItem("token");
  if (authUrl.includes(to.path)) {
    if (!token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
