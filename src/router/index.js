import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/SignIn.vue';
import Dashboard from '../views/Dashboard.vue';
import { useUserStore } from '../store/user';

const routes = [
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/auth', component: Auth }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.fetchUser();

  if (to.meta.requiresAuth && !userStore.user) {
    next('/auth');
  } else {
    next();
  }
});

export default router;
