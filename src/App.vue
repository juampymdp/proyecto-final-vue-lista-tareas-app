<script setup>
import AppHeader from './components/AppHeader.vue';

import { onMounted } from "vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUser();
});

</script>

<template>
<section>
  <div class="app">
    <AppHeader />
    <router-view class="app-main" />
  </div>
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