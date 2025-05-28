
<script setup>
import { ref, onMounted } from "vue";
import { useTaskStore } from '../store/task';
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const newTask = ref("");

const handleAddTask = async () => {
  if (!newTask.value.trim()) return;
  await taskStore.addTask(newTask.value.trim());
  newTask.value = "";
};

const toggleTask = async (task) => {
  await taskStore.toggleComplete(task);
};

const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
};

onMounted(() => {
  taskStore.fetchTasks();
});

onMounted(async () => {
  await userStore.fetchUser();
  if (!userStore.user) {
    router.push("/signin");
    return;
  }

  await taskStore.fetchTasks();
});

</script>
<template>
  <section>
  <div class="dashboard-container bg-light min-vh-100 py-5">
    <!-- Encabezado -->
    <header class="text-center mb-5">
      <img src="./assets/logo.png" alt="Logo" class="logo mb-3" />
      <h1 class="dashboard-title">Tus Tareas</h1>
    </header>

    <!-- Agregar tarea -->
    <div class="container mb-4">
      <form @submit.prevent="handleAddTask" class="d-flex justify-content-center">
        <input
          v-model="newTask"
          type="text"
          class="form-control w-50 me-2"
          placeholder="Agregar nueva tarea..."
          required
        />
        <button class="btn btn-primary" type="submit">Agregar</button>
      </form>
    </div>

    <!-- Lista de tareas -->
    <div class="container">
      <ul class="list-group">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <input
              type="checkbox"
              class="form-check-input me-2"
              :checked="task.completed"
              @change="toggleTask(task)"
            />
            <span :class="{ 'text-decoration-line-through': task.completed }">
              {{ task.task }}
            </span>
          </div>
          <div>
            <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">
              Eliminar
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </section>
</template>




<style scoped>
.logo {
  width: 320px;
  height: 82px;
}
.dashboard-title {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 30px;
}
</style>




<!-- <script setup>
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
</style> -->
