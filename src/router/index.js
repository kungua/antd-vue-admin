import Vue from "vue";
import VueRouter from "vue-router";
import RenderRouterView from "../components/RenderRouterView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: RenderRouterView,
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () => import(/* webpackChunkName: "user" */ "../views/User/Register")
      },
      {
        path: "/user/register",
        name: "register",
        component: () => import(/* webpackChunkName: "user" */ "../views/User/Register")
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
