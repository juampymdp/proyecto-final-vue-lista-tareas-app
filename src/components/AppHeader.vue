<!-- 
<script setup>
defineProps(['userEmail']);
const emit = defineEmits(['logout']);
const logout = () => emit('logout');
</script>

<template>
  <section>
  <header class="app-header">
    <div>
      <h1>¡HOLA!</h1>
      <p>{{ userEmail }}</p>
    </div>
    <button @click="logout">Cerrar sesión</button>
  </header>
  </section>
</template>

 -->
<script setup>
import { useUserStore } from '../store/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  await userStore.logout();
  router.push('/signin');
};
</script>

<template>
  <header class="app-header">
    <h1 class="logo">Mis Tareas</h1>
    <button @click="logout" class="logout-btn">Cerrar sesión</button>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  background-color: #3f51b5;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.logout-btn {
  background-color: white;
  color: #3f51b5;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
}

.logout-btn:hover {
  background-color: #e0e0e0;
}
</style>
