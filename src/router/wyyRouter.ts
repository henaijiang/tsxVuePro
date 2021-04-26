import { RouteConfig } from "vue-router";

const wyyRouter: RouteConfig = {
  path: "/",
  component: () => import("@/App"),
  children: [
    {
      path: "/",
      name: "find-music",
      component: () => import("@/components/main/wyy/FindMusic"),
      meta: { keepAlive: false, title: "发现音乐" }
    },
    {
      path: "/my-music",
      name: "my-music",
      component: () => import("@/components/main/wyy/MyMusic"),
      meta: { keepAlive: false, title: "我的音乐" }
    },
    {
      path: "/wyy-login",
      name: "wyy-login",
      component: () => import("@/components/main/wyy/WyyLogin"),
      meta: { keepAlive: false, title: "网易云登录" }
    }
  ]
};
export { wyyRouter };
