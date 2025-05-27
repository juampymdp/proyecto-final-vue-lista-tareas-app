import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    // 🟢 Obtener el usuario actual desde Supabase
    async fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error al obtener usuario:", error.message);
        return;
      }
      this.user = user;
    },

    // 🔵 Registro de usuario con confirmación de correo
    async signUp(email, password) {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        if (error.message.includes("email not confirmed")) {
          alert("Por favor, confirma tu correo electrónico para acceder.");
        } else {
          alert(`Error: ${error.message}`);
        }
        throw error;
      }

      alert("Registro exitoso. Revisa tu correo y confirma tu cuenta antes de iniciar sesión.");
    },

    // 🔴 Inicio de sesión verificando confirmación de correo
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.includes("email not confirmed")) {
          alert("Tu correo aún no ha sido confirmado. Revisa tu bandeja de entrada.");
        } else {
          alert(`Error: ${error.message}`);
        }
        throw error;
      }

      this.user = user;
    },

    // 🟠 Cierre de sesión y limpieza de estado
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error al cerrar sesión:", error.message);
        return;
      }
      this.user = null;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'user', storage: localStorage }
    ]
  }
});
