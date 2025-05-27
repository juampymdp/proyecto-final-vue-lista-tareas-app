<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task';

const taskStore = useTaskStore();
const task = ref('');

function addTask() {
  if (task.value.trim() !== '') {
    taskStore.addTask(task.value);
    task.value = '';
  }
}
</script>

<template>
    <section> 
 <div class="new-task">
    <input v-model="task" type="text" placeholder="Escribe una nueva tarea..." />
    <button @click="addTask">Agregar</button>
  </div>
    </section>

</template>

<style scoped>
.new-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
}

button {
  padding: 8px;
  background: #03dac6;
  color: white;
  border: none;
}
</style>