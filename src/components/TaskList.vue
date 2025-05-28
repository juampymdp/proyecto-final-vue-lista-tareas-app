<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '../store/task';
import TaskItem from './TaskItem.vue';

const taskStore = useTaskStore();

onMounted(async () => {
  try {
    await taskStore.fetchTasks();
  } catch (error) {
    console.error('Error al cargar tareas:', error.message);
  }
});
</script>

<template>
  <section>
  <div class="task-list">
    <p v-if="taskStore.tasks.length === 0" class="empty">No hay tareas aún.</p>

    <ul v-else class="task-items">
      <TaskItem
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
      />
    </ul>
  </div>
  </section>
</template>

<style scoped>
.task-list {
  padding: 1rem;
}
.empty {
  color: #666;
  font-style: italic;
  text-align: center;
}
.task-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
