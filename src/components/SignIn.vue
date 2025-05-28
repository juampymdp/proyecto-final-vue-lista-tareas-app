
<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';
import { useUserStore } from '../store/user';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const isLogin = ref(true);
const errorMessage = ref('');

const userStore = useUserStore();
const router = useRouter();

const handleSubmit = async () => {
  errorMessage.value = '';
  let result;

  if (isLogin.value) {
    result = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
  } else {
    result = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    });
  }

  if (result.error) {
    errorMessage.value = result.error.message;
  } else {
    await userStore.fetchUser();
    router.push('/');
  }
};
</script>
<template>
  <section>
  <div class="auth-container">
    <h2>{{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">
        {{ isLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
      </button>
    </form>

    <p>
      <span>
        {{ isLogin ? "¿No tenés una cuenta?" : "¿Ya tenés una cuenta?" }}
      </span>
      <a href="#" @click.prevent="isLogin = !isLogin">
        {{ isLogin ? 'Registrate' : 'Iniciá sesión' }}
      </a>
    </p>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
  </section>
</template>


<style scoped>
.auth-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  margin-top: 1rem;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>



<!-- <script setup>
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
</style> -->