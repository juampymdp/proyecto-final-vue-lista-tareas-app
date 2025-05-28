import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      const userStore = useUserStore();
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userStore.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      this.tasks = data;
    },

    async addTask(taskText) {
      const userStore = useUserStore();
      const { error } = await supabase.from("tasks").insert([
        {
          task: taskText,
          completed: false,
          user_id: userStore.user.id,
        },
      ]);

      if (error) throw error;
      await this.fetchTasks();
    },

    async deleteTask(id) {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
      await this.fetchTasks();
    },

    async toggleComplete(task) {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !task.completed })
        .eq("id", task.id);

      if (error) throw error;
      await this.fetchTasks();
    },

    async editTask(id, newTaskText) {
      const { error } = await supabase
        .from("tasks")
        .update({ task: newTaskText })
        .eq("id", id);

      if (error) throw error;
      await this.fetchTasks();
    },
  },
});
