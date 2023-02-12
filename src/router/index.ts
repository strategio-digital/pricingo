import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "pageNotFound" */ '../views/PageNotFound.vue'),
    meta: {
      title: 'Stránka nenalezena | Pricingo'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Dynamická cenotvorba | Pricingo',
    }
  },
  {
    path: '/report-:id',
    name: 'Report',
    meta : {
      title: 'Pricingo | Detail vašeho reportu',
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Report.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( (to, from, next) => {
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title;
  }

  next();
});

export default router;
