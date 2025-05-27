import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useTaskStore = defineStore('tasks', {
  state: () => ({ tasks: [] }),
  actions: {
    async fetchTasks() {
      const { data } = await supabase.from("tasks").select("*").order("id", { ascending: false });
      this.tasks = data;
    },
    async addTask(task) {
      await supabase.from("tasks").insert([{ task, completed: false }]);
      await this.fetchTasks();
    },
    async updateTask(taskId, updatedTask) {
      await supabase.from("tasks").update({ task: updatedTask }).eq("id", taskId);
      await this.fetchTasks();
    },
    async toggleTask(taskId, completed) {
      await supabase.from("tasks").update({ completed }).eq("id", taskId);
      await this.fetchTasks();
    },
    async deleteTask(taskId) {
      await supabase.from("tasks").delete().eq("id", taskId);
      await this.fetchTasks();
    }
  }
});
