<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/user';

const userStore = useUserStore();
const email = ref('');
const password = ref('');

function login() {
  userStore.signIn(email.value, password.value);
}
</script>

<template>
 <section>
  <div class="auth">
    <h2>Iniciar sesión</h2>
    <input v-model="email" type="email" placeholder="Correo electrónico" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="login">Ingresar</button>
  </div>
 </section>
</template>

<style scoped>
.auth {
  max-width: 300px;
  margin: auto;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  width: 100%;
  padding: 8px;
  background: #6200ea;
  color: white;
}
</style>