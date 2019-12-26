import Vue from "vue";
import VueRouter from "vue-router";
// import RenderRouterView from "../components/RenderRouterView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    // component: { render: h => h("router-view") },
    // component: RenderRouterView,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
