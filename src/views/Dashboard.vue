
<script setup>
import { ref, onMounted } from "vue";
import { useTaskStore } from '../store/task';
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
import { useRouter } from 'vue-router';
import { supabase } from '../supabase'
import AppHeader from "../components/AppHeader.vue";

const userStore = useUserStore();
const router = useRouter();

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

const editTask = async (task) => {
  await taskStore.editTaskInPlace(task);
};

const saveTask = async (task) => {
  await taskStore.saveTaskInPlace(task);
};

onMounted(() => {
  taskStore.fetchTasks();
});

onMounted(async () => {
  if (await supabase.auth.getUser() == null) {
    
    router.push("/signin");
    return;
  }

  await taskStore.fetchTasks();
  
});
console.log("Usuario logueado:", userStore.user);
</script>
<template>
  <section>
    <AppHeader></AppHeader>
    <div class="dashboard-container fondo-dashboard min-vh-100 py-5">
    <!-- Encabezado -->
    <header class="text-center mb-5">
      <img src="../assets/logo.png" alt="Logo" class="logo mb-3" />
      <h1 class="dashboard-title">Lista de Tareas</h1>
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

   
    <div class="container">
      <ul class="list-group">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div v-if="!task.isEditing" class="d-flex justify-content-between align-items-center w-100">
            <div class="itemizq d-flex align-items-center">
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

            <div class="itemder">
              <button class="btn btn-sm btn-outline-primary me-2" @click="editTask(task)">
                Editar
              </button> 
              <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">
                Eliminar
              </button>
            </div>
          </div>
          <div v-else class="d-flex justify-content-between align-items-center w-100">
            <div class="itemizq d-flex align-items-center">
              <input
                type="checkbox"
                class="form-check-input me-2"
                :checked="task.completed"
                @change="toggleTask(task)"
              />
              <input v-model="task.editedTitle" @keyup.enter="editTask" />
            </div> 

            <div class="itemder">
              <button class="btn btn-sm btn-outline-primary me-2" @click="saveTask(task)">
                Guardar
              </button> 
              <button class="btn btn-sm btn-danger" @click="editTask(task)">
                Cancelar
              </button>
            </div>
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
.itemizq {
  flex: 1;
}

.itemder {
  display: flex;
  gap: 0.5rem;
}
.fondo-dashboard {
  background-color: #311a94;
  color: white; /* Opcional: texto blanco para buen contraste */
}

@media screen {
  min-width: 600px;
  
}
</style>
