import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

// lazy-loaded
const Profile = () => import("./components/Profile.vue");
const BoardAdmin = () => import("./components/BoardAdmin.vue");
const BoardModerator = () => import("./components/BoardModerator.vue");
const BoardUser = () => import("./components/BoardUser.vue");

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/admin",
    name: "admin",
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    component: BoardUser,
  },
  {
  path: '/select-role',
  name: 'RoleSelection',
  component: () => import('@/components/RoleSelection.vue')
},
{
  path: '/register-doctor',
  name: 'RegisterDoctor',
  component: () => import('@/components/RegisterDoctor.vue')
},
{
  path: '/register-moru',
  name: 'RegisterMoru',
  component: () => import('@/components/RegisterMoru.vue')
},
{
  path: "/admin/user-management",
  name: "AdminUserList",
  component: () => import("@/components/admin/AdminUserList.vue"),
  meta: { requiresAuth: true, roles: ["ROLE_ADMIN"] }
}


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Uncomment this if you want auth guard
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');
//
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;
