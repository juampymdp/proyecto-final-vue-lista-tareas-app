import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  function setUser(payload) {
    user.value = payload;
  }

  async function logout() {
   await supabase.auth.signOut()
   user.value = null;
  }

  return {
    user,
    setUser,
    logout,
  };
});
