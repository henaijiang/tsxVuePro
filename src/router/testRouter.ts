import { RouteConfig } from "vue-router";

const testRouter: RouteConfig = {
  path: "/test",
  name: "test",
  component: () => import("@/App"),
  children: [
    {
      path: "/test",
      name: "Test",
      component: () => import("@/components/Test"),
      meta: { keepAlive: true, title: "Test" }
    }
  ]
};
export { testRouter };
