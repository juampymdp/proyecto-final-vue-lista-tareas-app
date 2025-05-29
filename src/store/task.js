import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("completed", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) throw error;
      this.tasks = data;
    },

    async addTask(taskText) {
      const { data: { user } } = await supabase.auth.getUser()
      const { error } = await supabase.from("tasks").insert([
        {
          task: taskText,
          completed: false,
          user_id: user.id,
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

    async editTaskInPlace(task) {
      task.editedTitle = task.task
      task.isEditing = !task.isEditing
    },

    async saveTaskInPlace(task) {
      this.editTask(task.id, task.editedTitle)
      task.isEditing = !task.isEditin
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
