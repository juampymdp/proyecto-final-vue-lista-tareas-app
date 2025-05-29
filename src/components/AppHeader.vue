
<script setup>
import { useUserStore } from "../store/user";
import { useRouter } from 'vue-router';
defineProps(['userEmail']);
const router = useRouter();
const userStore = useUserStore();
const emit = defineEmits(['logout']);
const logout = async () => {
  await userStore.logout()
  router.push("/signin");
};

</script>

<template>
  <section>
  <header class="app-header">
    <div>
       <img src="../assets/logo-header.png" alt="Logo" class="logo" />
      <!-- <h1>¡HOLA!</h1>
      <p>{{ userEmail }}</p> -->
    </div>
    <button class="logout-btn" @click="logout()">Cerrar sesión</button>
  </header>
  </section>
</template>

<style scoped>
.app-header {
  width: 100%;
  height: 70px;
  background-color: #fff3d5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.logo {
  width: 150px;
  height: 40px;
  object-fit: contain;
}

.logout-btn {
  background-color: #8b7cf2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background-color: #7564e2;
  transform: scale(1.05);
}

.logout-btn:active {
  background-color: #5e50c4;
  transform: scale(0.98);
}
</style>



