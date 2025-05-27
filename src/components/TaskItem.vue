<script setup>
import { useTaskStore } from '../store/task';

const taskStore = useTaskStore();
defineProps(['task']);

function toggleTask() {
  taskStore.toggleTask(task.id, !task.completed);
}

function deleteTask() {
  taskStore.deleteTask(task.id);
}

</script>

<template>
<section> 
 <div class="task">
    <p :class="{ completed: task.completed }">{{ task.task }}</p>
    <button @click="toggleTask">{{ task.completed ? '☑️' : '⬜' }}</button>
    <button @click="deleteTask">❌</button>
  </div>
</section>
</template>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 10px;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>