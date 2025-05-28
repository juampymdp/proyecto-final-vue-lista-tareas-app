import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import Dashboard from '../views/Dashboard.vue';
import { useUserStore } from '../store/user';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/signin',
    component: SignIn,
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ⛔ Protección de rutas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.user) {
    next('/signin');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.user) {
    // Almacenar la ruta original
    userStore.returnUrl = to.fullPath;
    next('/signin');
  } else {
    next();
  }
});


export default router;
