import { RouteConfig } from "vue-router";

const threeRouter: RouteConfig = {
  path: "/three",
  name: "three",
  component: () => import("@/App"),
  children: [
    {
      path: "/three",
      name: "Threejs",
      component: () => import("@/components/three/Threejs"),
      meta: { keepAlive: false, title: "Threejs" }
    }
  ]
};
export { threeRouter };
