import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/SignIn.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/auth', component: Auth }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.fetchUser();
  if (to.meta.requiresAuth && !userStore.user) {
    next("/login");
  } else {
    next();
  }
});

async logout() {
  await supabase.auth.signOut();
  this.user = null;
}
