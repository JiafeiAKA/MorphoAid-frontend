import { createWebHistory, createRouter } from "vue-router";
import Home from './views/shared/Home.vue';
import Login from './views/auth/Login.vue';

// lazy-loaded
const Profile = () => import("./views/admin/Profile.vue");
const BoardAdmin = () => import("./components/dashboard/AdminDashboard.vue");
const BoardModerator = () => import("./components/dashboard/MoruDashboard.vue");
const BoardUser = () => import("./components/dashboard/DoctorDashboard.vue");
const Dashboard = () => import('@/views/Dashboard.vue');

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
  component: () => import('@/views/auth/RoleSelection.vue')
},
{
  path: '/register-doctor',
  name: 'RegisterDoctor',
  component: () => import('@/views/auth/RegisterDoctor.vue')
},
{
  path: '/register-moru',
  name: 'RegisterMoru',
  component: () => import('@/views/auth/RegisterMoru.vue')
},
{
  path: "/admin/user-management",
  name: "AdminUserList",
  component: () => import("@/components/admin/AdminUserList.vue"),
  meta: { requiresAuth: true, roles: ["ROLE_ADMIN"] }
},
{
  path: '/dashboard',
  name: 'dashboard',
  component: Dashboard,
  meta: { requiresAuth: true }
}


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
