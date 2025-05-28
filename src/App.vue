<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from './supabase';
import { useUserStore } from './store/user';

const router = useRouter();
const userStore = useUserStore();

// Verifica el usuario actual al iniciar la app
onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();
  if (data?.user) {
    userStore.setUser(data.user);
    router.push('/dashboard');
  } else {
    router.push('/signin');
  }
});
</script>

<template>
  <router-view />
</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
}
</style>
