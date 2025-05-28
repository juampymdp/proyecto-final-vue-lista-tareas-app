
<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/store/task'

const taskStore = useTaskStore()
const tasks = ref([])
const newTask = ref('')

onMounted(async () => {
  await taskStore.fetchTasks()
  tasks.value = taskStore.tasks
})

const handleAddTask = async () => {
  if (!newTask.value.trim()) return
  await taskStore.addTask(newTask.value.trim())
  newTask.value = ''
  tasks.value = taskStore.tasks
}

const toggleComplete = async (task) => {
  await taskStore.toggleComplete(task)
  tasks.value = taskStore.tasks
}

const deleteTask = async (id) => {
  await taskStore.deleteTask(id)
  tasks.value = taskStore.tasks
}
</script>


<template>
    <section>
  <div class="task-list">
    <form @submit.prevent="handleAddTask" class="add-task-form">
      <input v-model="newTask" type="text" placeholder="Nueva tarea..." />
      <button type="submit">Agregar</button>
    </form>

    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <label>
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleComplete(task)"
          />
          <span :class="{ completed: task.completed }">{{ task.task }}</span>
        </label>
        <button @click="deleteTask(task.id)">🗑️</button>
      </li>
    </ul>

    <p v-else>No hay tareas aún.</p>
  </div>
  </section>
</template>

<style scoped>
.task-list {
  max-width: 500px;
  margin: 0 auto;
}

.add-task-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
