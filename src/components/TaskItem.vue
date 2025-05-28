<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/task';

defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const taskStore = useTaskStore();
const isEditing = ref(false);
const editedTitle = ref('');

const startEditing = () => {
  editedTitle.value = task.title;
  isEditing.value = true;
};

const saveEdit = async () => {
  if (editedTitle.value.trim()) {
    await taskStore.editTask(task.id, editedTitle.value);
    isEditing.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
};

const toggleComplete = async () => {
  await taskStore.toggleComplete(task);
};

const deleteTask = async () => {
  if (confirm('¿Eliminar esta tarea?')) {
    await taskStore.deleteTask(task.id);
  }
};
</script>

<template>
  <section>
  <li class="task-item">
    <input type="checkbox" :checked="task.completed" @change="toggleComplete" />

    <div class="content" v-if="!isEditing">
      <span :class="{ done: task.completed }">{{ task.task }}</span>
      <button @click="startEditing">Editar</button>
      <button @click="deleteTask">Eliminar</button>
    </div>

    <div v-else class="edit">
      <input v-model="editedTitle" @keyup.enter="saveEdit" />
      <button @click="saveEdit">Guardar</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </li>
  </section>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.task-item input[type="checkbox"] {
  margin-right: 1rem;
}

.content {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.edit input {
  margin-right: 0.5rem;
}

.done {
  text-decoration: line-through;
  color: #888;
}
</style>
