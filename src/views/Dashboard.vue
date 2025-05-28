
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { useTaskStore } from '../store/task';
import AddTask from '../components/AddTask.vue';

const router = useRouter();
const userStore = useUserStore();
const taskStore = useTaskStore();

const newTaskTitle = ref('');
const newTaskDescription = ref('');
const tasks = ref([]);

const handleAddTask = async () => {
  if (!newTaskTitle.value || !newTaskDescription.value) return;
  await taskStore.addTask(newTaskTitle.value, newTaskDescription.value);
  await loadTasks();
  newTaskTitle.value = '';
  newTaskDescription.value = '';
};

const loadTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
};

const toggleTask = async (task) => {
  await taskStore.toggleTask(task.is_complete, task.id);
};

const deleteTask = async (id) => {
  await taskStore.deleteTask(id);
  await loadTasks();
};

const logout = async () => {
  await userStore.logout();
  router.push('/auth');
};

onMounted(() => {
  loadTasks();
});
</script>

<template>
<section>
   <div>
   
    <h1>Bienvenido a tu lista de tareas</h1>
    <button @click="logout">Cerrar sesión</button>

    <form @submit.prevent="handleAddTask">
      <input v-model="newTaskTitle" placeholder="Título" required />
      <input v-model="newTaskDescription" placeholder="Descripción" required />
      <button type="submit">Agregar tarea</button>
    </form>

    <ul v-if="tasks?.length">
      <li v-for="task in tasks" :key="task.id">
        <label>
          <input type="checkbox" v-model="task.is_complete" @change="toggleTask(task)" />
          {{ task.title }} - {{ task.description }}
        </label>
        <button @click="deleteTask(task.id)">Eliminar</button>
      </li>
    </ul>
    <p v-else>No hay tareas.</p>
  </div>
    <main class="max-w-xl mx-auto mt-10">
    <AddTask />
    <!-- Aquí más adelante iría <TaskList /> -->
  </main>
  
  </section>
</template>






<!-- <script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "./stores/task";
import { useUserStore } from "./stores/user";

const taskStore = useTaskStore();
const userStore = useUserStore();

const title = ref("");
const description = ref("");

const canSubmit = computed(() => {
  return title.value.trim() !== "" && description.value.trim() !== "" && userStore.user;
});

const handleAddTask = async () => {
  if (!canSubmit.value) return;

  await taskStore.addTask(title.value, description.value);

  title.value = "";
  description.value = "";
};
const confirmDelete = (id) => {
  if (confirm("¿Estás seguro de eliminar esta tarea?")) {
    taskStore.deleteTask(id);
  }
};
import { onMounted } from "vue";

onMounted(async () => {
  await taskStore.fetchTasks();
});

const toggleTaskState = async (task) => {
  await taskStore.toggleTask(!task.is_complete, task.id);
};

const deleteTask = async (id) => {
  if (confirm("¿Seguro que querés eliminar esta tarea?")) {
    await taskStore.deleteTask(id);
  }
};


</script>


<template>
<section>
  <div class="dashboard">
    <form @submit.prevent="handleAddTask">
      <input
        type="text"
        placeholder="Título"
        v-model="title"
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        v-model="description"
        required
      />
      <button type="submit" :disabled="!canSubmit">Agregar tarea</button>
    </form>

    <p v-if="!userStore.user" class="warning">
      ⚠️ Debes iniciar sesión para agregar tareas.
    </p>

    <ul>
  <li v-for="task in taskStore.tasks" :key="task.id">
    <span :class="{ done: task.is_complete }">{{ task.title }}</span>
    <button @click="taskStore.toggleTask(!task.is_complete, task.id)">
      {{ task.is_complete ? "Desmarcar" : "Completar" }}
    </button>
  </li>
  <button @click="confirmDelete(task.id)">🗑️</button>

</ul>
<ul class="task-list">
  <li
    v-for="task in taskStore.tasks"
    :key="task.id"
    :class="{ done: task.is_complete }"
  >
    <div class="task-content">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
    </div>

    <div class="task-actions">
      <button @click="toggleTaskState(task)">
        {{ task.is_complete ? "Desmarcar" : "Completar" }}
      </button>
      <button @click="deleteTask(task.id)">Eliminar</button>
    </div>
  </li>
</ul>

  </div>
</section>
</template>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.completed {
  text-decoration: line-through;
  color: gray;
}

.icon {
  font-size: 16px;
}
.warning {
  color: red;
  margin-top: 1rem;
}
.done {
  text-decoration: line-through;
  color: gray;
}

.task-list {
  list-style: none;
  padding: 0;
}
.task-list li {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
.task-actions button {
  margin-right: 0.5rem;
}


</style> -->