<script setup>
</script>


<template>
    <section>
<nav class="nav">
    <router-link to="/">Inicio</router-link>
    <router-link to="/auth">Login</router-link>
  </nav>
  </section>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  background: #3700b3;
}

.nav a {
  color: white;
  text-decoration: none;
}
</style>