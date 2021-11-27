import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Welcome',
    component: Welcome,
    path: '/' 
  },
  {
    name: 'Login',
    component: Login,
    path: '/login' 
  },
  {
    name: 'SignUp',
    component: SignUp,
    path: '/sign-up' 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
