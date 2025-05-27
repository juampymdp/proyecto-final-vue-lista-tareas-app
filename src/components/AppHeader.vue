<script setup>
import { useUserStore } from '../store/user';

const userStore = useUserStore();
function logout() {
  userStore.signOut();
}
</script>

<template>
    <section>
  <header class="header">
    <h1>To-Do App</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/auth">Login</router-link>
    </nav>
    <button @click="logout">Cerrar sesión</button>
    </header> 
    </section>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #6200ea;
  color: white;
  padding: 1rem;
}

nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
}

</style>