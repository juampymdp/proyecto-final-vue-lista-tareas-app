<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task';

const newTask = ref('');
const taskStore = useTaskStore();

const handleAdd = async () => {
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
  <form @submit.prevent="handleAdd" class="add-task-form">
    <input
      v-model="newTask"
      type="text"
      placeholder="Nueva tarea..."
      class="task-input"
    />
    <button type="submit" class="add-button">Agregar</button>
  </form>
</template>

<style scoped>
.add-task-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.task-input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.add-button {
  background-color: #2c7be5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.add-button:hover {
  background-color: #1a5ed9;
}
</style>
