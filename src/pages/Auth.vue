<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const isSignUp = ref(false);
const email = ref('');
const password = ref('');

async function handleAuth() {
  if (isSignUp.value) {
    await userStore.signUp(email.value, password.value);
  } else {
    await userStore.signIn(email.value, password.value);
  }
  router.push('/'); // Redirigir al Dashboard después del login
}

function toggleAuthMode() {
  isSignUp.value = !isSignUp.value;
}
</script>



<template>
<section> 
  <div class="auth-container">
    <h2>{{ isSignUp ? 'Regístrate' : 'Inicia sesión' }}</h2>
    <form @submit.prevent="handleAuth">
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      
      <button type="submit">{{ isSignUp ? 'Crear cuenta' : 'Ingresar' }}</button>
    </form>

    <p @click="toggleAuthMode">
      {{ isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate' }}
    </p>
  </div>
  </section>
</template>

<style scoped>
.auth-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  width: 100%;
  padding: 10px;
  background: #6200ea;
  color: white;
  border: none;
}

p {
  cursor: pointer;
  color: #6200ea;
}
</style>