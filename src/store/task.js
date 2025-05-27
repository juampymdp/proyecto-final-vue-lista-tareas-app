async addTask(title, description) {
  const userStore = useUserStore();

  if (!userStore.user) {
    console.error("Usuario no autenticado");
    return;
  }

  const { data, error } = await supabase.from("tasks").insert([
    {
      user_id: userStore.user.id,
      title,
      description,
      is_complete: false,
    },
  ]);

  if (error) {
    console.error("Error al insertar la tarea:", error.message);
  } else {
    await this.fetchTasks(); // actualiza la lista
  }
}
