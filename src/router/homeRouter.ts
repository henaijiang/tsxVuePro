import { RouteConfig } from "vue-router";

const homeRouter: RouteConfig = {
  path: "/home",
  name: "home",
  component: () => import("@/App"),
  children: [
    {
      path: "/home",
      name: "Home",
      component: () => import("@/components/Home"),
      meta: { keepAlive: false, title: "Home" }
    }
  ]
};
export { homeRouter };
