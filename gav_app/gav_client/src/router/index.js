import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    component: Home,
    path: '/',
  },
  {
    name: 'Welcome',
    component: Welcome,
    path: '/welcome' 
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
