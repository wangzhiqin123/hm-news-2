import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import User from "../pages/User.vue";
import Edit from "../pages/Edit.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", component: Login },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/user", name: "user", component: User },
    { path: "/edit", name: "edit", component: Edit }
  ]
});

router.beforeEach(function(to, from, next) {
  // console.log('to',to)
  // console.log('from',from)
  const authUrl = [ '/user', '/edit']
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
