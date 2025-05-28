<script setup>
import { onMounted } from 'vue';
import { useTaskStore } from '../store/task';
import { useUserStore } from '../store/user';
import { useRouter } from 'vue-router';
import AppHeader from '../components/AppHeader.vue';
import AddTask from '../components/AddTask.vue';
import TaskList from '../components/TaskList.vue';

const taskStore = useTaskStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  // Si no hay usuario, redirige a login
  if (!userStore.user) {
    router.push('/signin');
    return;
  }

  // Carga las tareas del usuario
  await taskStore.fetchTasks();
});
</script>

<template>
  <section>
  <div class="dashboard">
    <AppHeader />
    <main class="container">
      <AddTask />
      <TaskList />
    </main>
  </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
