import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import Store from "../store";
import { wyyRouter } from "./wyyRouter";
import { threeRouter } from "./threeRouter";
import { mapboxGlRouter } from "./mapboxGlRouter";
import { homeRouter } from "./homeRouter";
import { testRouter } from "./testRouter";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("@/components/Index"),
    meta: { keepAlive: true },
    children: [wyyRouter, threeRouter, mapboxGlRouter, homeRouter, testRouter]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/login/Login"),
    meta: { keepAlive: false }
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/components/Unknow"),
    meta: { keepAlive: false }
  }
];

const router = new VueRouter({
  /*  mode: "history",
  base: process.env.BASE_URL, */
  routes
});

/* router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    if (!sessionStorage.getItem("loginUser")) {
      next({ path: "/login" });
      Message.success("你还未登陆，请先登陆");
    } else {
      next();
    }
  } else {
    next();
  }
}); */
router.afterEach((to: Route, from) => {
  Store.commit("addTabsViews", to);
  if (to.meta.keepAlive) {
    to.matched.forEach(item => {
      Store.dispatch("addCachedViewsName", item);
    });
  }
});

export default router;
