import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Home from '../views/Home.vue';
import Route from '../views/Route.vue';
import Favorites from '../views/Favorites.vue';
import Monitor from '../views/Monitor.vue';
import Map from '../views/Map.vue';
import Planer from '../views/Planer.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'Welcome',
    component: Welcome,
    path: '/',
  },
  {
    name: 'Login',
    component: Login,
    path: '/login',
  },
  {
    name: 'SignUp',
    component: SignUp,
    path: '/sign-up',
  },
  {
    name: 'Home',
    component: Home,
    path: '/home',
  },
  {
    name: 'Route',
    component: Route,
    path: '/route',
    props: (route) => ({ query: route.query }),
  },
  {
    name: 'Favoriten',
    component: Favorites,
    path: '/favoriten',
  },
  {
    name: 'Monitor',
    component: Monitor,
    path: '/monitor',
  },
  {
    name: 'Map',
    component: Map,
    path: '/map',
  },
  {
    name: 'Planer',
    component: Planer,
    path: '/planer',
  },
  {
    name: 'Einstellungen',
    component: Settings,
    path: '/settings',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
