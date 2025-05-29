<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from './supabase';
import { useUserStore } from './store/user';

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    userStore.setUser(data.user);
    router.push('/');
  } else {
    router.push('/signin');
  }
});
</script>

<template>
  <section class='backgr'>
      <router-view />
  </section>

</template>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
}
.backrg {
  background-color: #311a94;
}
@media screen {
  min-height: 600px;
  
}
</style>
