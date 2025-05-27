import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error al obtener el usuario:", error.message);
        return;
      }
      this.user = data.user;
    },
    logout() {
      this.user = null;
    },
  },
});
