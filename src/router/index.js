import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:'/',component:Register},
    {path:'/login',name:'login',component:Login},
    {path:'/register',name:'register',component:Register},
    {path:'/user',name:'user',component:User},
  ]
})

export default router