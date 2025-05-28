<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task';

const newTask = ref('');
const taskStore = useTaskStore();

const handleAddTask = async () => {
  if (!newTask.value.trim()) return;
  try {
    await taskStore.addTask(newTask.value);
    newTask.value = '';
  } catch (error) {
    console.error('Error al agregar tarea:', error.message);
  }
};
</script>

<template>
  <section>
  <form @submit.prevent="handleAddTask" class="flex gap-2 mt-4">
    <input
      v-model="newTask"
      type="text"
      placeholder="Agregar una tarea..."
      class="border border-gray-300 rounded px-4 py-2 w-full"
      required
    />
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Agregar
    </button>
  </form>
  </section>
</template>


