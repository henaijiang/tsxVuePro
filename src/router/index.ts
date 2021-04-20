import { Message } from "element-ui";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/components/main-container/MainContainer"),
    meta: { keepAlive: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/login/Login"),
    meta: { keepAlive: false }
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/components/main-container/MainContainer"),
    meta: { keepAlive: true },
    children: [
      {
        path: "/main",
        name: "main",
        component: () => import("@/components/main/Main"),
        meta: { keepAlive: false }
      },
      {
        path: "/three",
        name: "three",
        component: () => import("@/components/three/Threejs"),
        meta: { keepAlive: false }
      },
      {
        path: "/mapboxGl",
        name: "mapboxGl",
        component: () => import("@/components/MapboxGl"),
        meta: { keepAlive: false }
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/components/Home"),
        meta: { keepAlive: false }
      },
      {
        path: "/test",
        name: "test",
        component: () => import("@/components/Test"),
        meta: { keepAlive: false }
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/components/Unknow"),
    meta: { keepAlive: false }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
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
});

export default router;
