import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      meta: { layout: "main", auth: true },
      component: Home
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: "empty" },
      component: () => import("../views/Login.vue")
    },
    {
      path: "/categories",
      name: "categories",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Categories.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "empty" },
      component: () => import("../views/Register.vue")
    },
    {
      path: "/history",
      name: "history",
      meta: { layout: "main", auth: true },
      component: () => import("../views/History.vue")
    },
    {
      path: "/history/detail-record/:id",
      name: "detail-record",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Detail-record.vue")
    },
    {
      path: "/planing",
      name: "planing",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Planing.vue")
    },
    {
      path: "/record",
      name: "record",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Record.vue")
    },
    {
      path: "/profile",
      name: "profile",
      meta: { layout: "main", auth: true },
      component: () => import("../views/Profile.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
