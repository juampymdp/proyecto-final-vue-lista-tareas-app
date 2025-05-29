Proyecto Final IH - App Lista de Tareas

Aplicación web desarrollada con Vue 3 y Supabase que permite a los usuarios gestionar sus tareas personales de manera eficiente. Incluye funcionalidades de autenticación, creación, edición y eliminación de tareas, todo con una interfaz moderna y responsiva.

🚀 Tecnologías Utilizadas

Vue 3 con Composition API
Vite para el entorno de desarrollo
Pinia para la gestión del estado
Supabase como backend (autenticación y base de datos)
Bootstrap 5 para estilos y diseño responsivo
Vue Router para la navegación entre vistas

✨ Características Principales

Autenticación de Usuarios: Registro e inicio de sesión utilizando Supabase Auth.
Gestión de Tareas:
Crear nuevas tareas.
Marcar tareas como completadas.
Editar y eliminar tareas existentes.
Interfaz Amigable: Diseño limpio y adaptado a dispositivos móviles.
Persistencia de Datos: Las tareas se almacenan de forma segura en la base de datos de Supabase.

🛠️ Instalación y Ejecución

Clonar el repositorio:
git clone https://github.com/juampymdp/proyecto-final-vue-lista-tareas-app.git
cd proyecto-final-vue-lista-tareas-app
Instalar dependencias:
npm install
Configurar Supabase:
Crea un proyecto en Supabase.
Obtén tu URL y clave anónima desde el panel de Supabase.
Crea un archivo .env en la raíz del proyecto y agrega:
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
Iniciar la aplicación:
npm run dev

La aplicación estará disponible en : https://fabulous-salmiakki-8151ac.netlify.app

📁 Estructura del Proyecto

proyecto-final-vue-lista-tareas-app/
├── public/
├── src/
│   ├── assets/           # Imágenes y recursos estáticos
│   ├── components/       # Componentes reutilizables (AppHeader, AddTask, TaskList)
│   ├── store/            # Gestión de estado con Pinia (task.js, user.js)
│   ├── views/            # Vistas principales (SignIn, SignUp, Dashboard)
│   ├── App.vue           # Componente raíz
│   ├── main.js           # Punto de entrada de la aplicación
│   └── supabase.js       # Configuración de Supabase
├── .env                  # Variables de entorno (no se incluye en el repositorio)
├── package.json
└── README.md
🧩 Funcionalidades Detalladas

Autenticación
Registro: Los usuarios pueden crear una cuenta con su correo electrónico y contraseña.
Inicio de Sesión: Acceso seguro mediante Supabase Auth.
Cierre de Sesión: Opción para cerrar sesión y proteger la información del usuario.
Gestión de Tareas
Agregar Tarea: Formulario para ingresar nuevas tareas.
Marcar como Completada: Checkbox para indicar tareas finalizadas.
Editar Tarea: Modificar el contenido de una tarea existente.
Eliminar Tarea: Remover tareas que ya no son necesarias.
📌 Personalización de Correos Electrónicos de Supabase

Supabase permite personalizar las plantillas de correos electrónicos para flujos de autenticación como confirmación de registro, restablecimiento de contraseña, entre otros. Puedes editar estas plantillas directamente desde el panel de Supabase en la sección Authentication > Templates.

Para una personalización más avanzada, como el uso de componentes de React en los correos, puedes utilizar funciones Edge junto con servicios como Resend.

🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar alguna funcionalidad o corregir errores, por favor:

Haz un fork del repositorio.
Crea una nueva rama con tu mejora:
git checkout -b mejora-nueva
Realiza tus cambios y haz commit:
git commit -m "Descripción de la mejora"
Sube tus cambios a tu fork:
git push origin mejora-nueva
Abre un Pull Request describiendo tus cambios.
📄 Licencia

Este proyecto está bajo la licencia MIT.

