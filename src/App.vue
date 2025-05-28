<script setup>
// import AppHeader from './components/AppHeader.vue';



import { onMounted } from 'vue';
import { useUserStore } from './store/user';
import { RouterView } from 'vue-router';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});



</script>

<template>
<section>

  <RouterView />

</section>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #eeeeee;
}

.app-main {
  flex-grow: 1;
  padding: 20px;
}

</style>