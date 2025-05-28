<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from '../supabase'
import { useUserStore } from "../store/user";

const email = ref("");
const password = ref("");
const router = useRouter();
const userStore = useUserStore();

const handleSignUp = async () => {
  const { data: { session }, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    userStore.setUser(session?.user ?? null);
    router.push("/");
  }
};
</script>


<template>
  <section>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light position-relative">
    <!-- Logo -->
    <img src="/src/assets/logo.png"alt="Logo" class="logo" />

    <!-- Formulario de registro -->
    <div class="form-container text-center">
      <h2 class="form-title mb-4">Regístrate</h2>

      <form @submit.prevent="handleSignUp">
        <div class="mb-3">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Correo electrónico"
            required
          />
        </div>

        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Contraseña"
            required
          />
        </div>

        <button type="submit" class="btn register-btn w-100">Crear cuenta</button>
      </form>

      <p class="mt-3">
        ¿Ya tienes cuenta?
        <router-link to="/signin">Ingresa</router-link>
      </p>
    </div>
  </div>
  </section>
</template>


<style scoped>
.logo {
  width: 320px;
  height: 82px;
  margin-top: 95px;
  margin-bottom: 20px;
}

.form-container {
  background-color: #fff3d5;
  border-radius: 40px;
  width: 480px;
  padding: 2rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-family: "Roboto", sans-serif;
  font-size: 35px;
  font-weight: bold;
}

.register-btn {
  background-color: #ffa8a5;
  color: #fc6253;
  font-family: "Roboto", sans-serif;
  font-size: 19px;
  font-weight: bold;
  height: 45px;
  border: none;
}
</style>
