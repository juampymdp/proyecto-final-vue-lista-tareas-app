import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    error: null,
  }),

  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      this.user = data?.user || null;
    },

    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        this.error = error.message;
        throw error;
      }

      this.user = data.user;
    },

    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          this.error = 'Por favor, confirmá tu correo electrónico.';
        } else {
          this.error = error.message;
        }
        throw error;
      }

      this.user = data.user;
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  }
});
