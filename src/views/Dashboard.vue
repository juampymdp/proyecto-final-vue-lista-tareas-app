<script setup>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";

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

</style>