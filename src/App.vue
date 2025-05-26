<script setup>
import AppHeader from './components/AppHeader.vue';
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
