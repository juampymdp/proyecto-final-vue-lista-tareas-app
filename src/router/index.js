
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import AuthLayout from '../components/AuthLayout.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import { supabase } from '../supabase'



const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'SignIn',
        component: SignIn,
        alias: '/signin', 
      },
      {
        path: '',
        name: 'SignUp',
        component: SignUp,
        alias: '/signup', 
      },
    ],
  },
];












const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (to.meta.requiresAuth && !session) {
    next('/auth');
  } else {
    next();
  }
});

export default router;
