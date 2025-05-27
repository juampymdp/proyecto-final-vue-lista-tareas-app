import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      console.log("add task desde useTaskStore", title);

      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    async editTask(title, description, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .match({ id: id });
    },

    async tooggleTask(is_complete, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: is_complete })
        .match({ id: id });
    },

    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: id });
    },
  },
});



// import { defineStore } from 'pinia';
// import { supabase } from '../supabase';

// export const useTaskStore = defineStore('task', {
//   state: () => ({ tasks: [] }),
//   actions: {
//     async fetchTasks() {
//       const { data } = await supabase.from("task").select("*").order("id", { ascending: false });
//       this.tasks = data;
//     },
//     async addTask(task) {
//       await supabase.from("task").insert([{ tasks: task, completed: false }]);
//       await supabase.from("task").insert([{ tasks: task, completed: false }]);
//       await this.fetchTasks();
//     },
//     async updateTask(taskId, updatedTask) {
//       await supabase.from("task").update({ task: updatedTask }).eq("id", taskId);
//       await this.fetchTasks();
//     },
//     async toggleTask(taskId, completed) {
//       await supabase.from("task").update({ completed }).eq("id", taskId);
//       await this.fetchTasks();
//     },
//     async deleteTask(taskId) {
//       await supabase.from("task").delete().eq("id", taskId);
//       await this.fetchTasks();
//     }
//   }
// });
