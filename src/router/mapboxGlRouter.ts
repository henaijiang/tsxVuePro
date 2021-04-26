import { RouteConfig } from "vue-router";

const mapboxGlRouter: RouteConfig = {
  path: "/mapboxGl",
  name: "mapboxGl",
  component: () => import("@/App"),
  children: [
    {
      path: "/mapboxGl",
      name: "MapboxGl",
      component: () => import("@/components/MapboxGl"),
      meta: { keepAlive: false, title: "MapboxGl" }
    }
  ]
};
export { mapboxGlRouter };
