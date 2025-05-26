<script setup>
import { useTaskStore } from '../store/task';
import { useUserStore } from '../store/user';
import { useRouter } from 'vue-router';
import NewTask from '../components/NewTask.vue';
import TaskItem from '../components/TaskItem.vue';

const userStore = useUserStore();
const taskStore = useTaskStore();
const router = useRouter();

taskStore.fetchTasks(); // Cargar tareas al entrar a la página

// Si el usuario no está autenticado, enviarlo a la página de login
if (!userStore.user) {
  router.push('/auth');
}
</script>

<template>
<section>
      <div class="dashboard">
    <h2>Mis Tareas</h2>
    <NewTask />
    
    <div class="tasks">
      <TaskItem v-for="task in taskStore.tasks" :key="task.id" :task="task" />
    </div>
  </div>
</section>
</template>

<style scoped>
.dashboard {
  max-width: 500px;
  margin: auto;
  text-align: center;
}

.tasks {
  margin-top: 20px;
}

</style>
