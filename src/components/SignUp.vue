<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';

const email = ref('');
const password = ref('');
const emit = defineEmits(['register-success']);

const handleRegister = async () => {
  if (!email.value || !password.value) {
    alert("Completá todos los campos.");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    alert("Error al registrarse: " + error.message);
  } else {
    emit('register-success');
  }
};
</script>

<template>
  <section>
  <form @submit.prevent="handleRegister">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button type="submit">Registrarse</button>
  </form>
  </section>
</template>
