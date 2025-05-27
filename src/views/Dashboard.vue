<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task';

const taskStore = useTaskStore();
const newTask = ref('');

// 🔄 Obtener todas las tareas al cargar la página
taskStore.fetchTasks();

// 🟢 Agregar nueva tarea
async function addTask() {
  if (newTask.value.trim() !== '') {
    await taskStore.addTask(newTask.value);
    newTask.value = ''; // Limpiar campo después de agregar
  }
}

// ✅ Marcar tarea como completada o incompleta
async function toggleTask(task) {
  await taskStore.toggleTask(task.id, task.completed);
}

// ✏️ Editar tarea (por ahora solo muestra un alert)
function editTask(task) {
  const updatedTask = prompt("Edita tu tarea:", task.task);
  if (updatedTask && updatedTask.trim() !== '') {
    taskStore.updateTask(task.id, updatedTask);
  }
}

// ❌ Eliminar tarea
async function deleteTask(taskId) {
  await taskStore.deleteTask(taskId);
}
</script>


<template>
<section>
  <div class="dashboard">
    <h2>Mis Tareas</h2>

    <!-- 🟢 Campo para agregar nueva tarea -->
    <div class="new-task">
      <input v-model="newTask" type="text" placeholder="Escribe una nueva tarea..." />
      <button @click="addTask">➕ Agregar</button>
    </div>

    <!-- 📋 Tabla de tareas -->
    <table>
      <thead>
        <tr>
          <th>Tarea</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in taskStore.tasks" :key="task.id">
          <td :class="{ completed: task.completed }">{{ task.task }}</td>
          <td>
            <input type="checkbox" v-model="task.completed" @change="toggleTask(task)" />
          </td>
          <td>
            <button @click="editTask(task)"><span class="icon">✏️</span></button>
            <button @click="deleteTask(task.id)"><span class="icon">🗑️</span></button>
          </td>
        </tr>
      </tbody>
    </table>
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
</style>