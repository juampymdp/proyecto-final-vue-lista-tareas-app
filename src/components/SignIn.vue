<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';

const email = ref('');
const password = ref('');
const emit = defineEmits(['login-success']);

const handleLogin = async () => {
  try {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    userStore.setUser(user);
    // Redirigir a la ruta original o al dashboard
    router.push(userStore.returnUrl || '/dashboard');
    userStore.returnUrl = null; // Limpiar la ruta almacenada
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
  }
};
</script>

<template>
  <section>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button type="submit">Iniciar sesión</button>
  </form>
  </section>
</template>
