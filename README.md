# 🚀 API REST de Usuarios



Una API RESTful construida con **Node.js** y **Express**, conectada a una base de datos **SQLite**. El proyecto está estructurado siguiendo el patrón **Repository** para facilitar el mantenimiento y una futura migración a otras bases de datos (como PostgreSQL).



## 🛠️ Tecnologías utilizadas



*   **Node.js** - Entorno de ejecución.

*   **Express** - Framework web para Node.js.

*   **SQLite (node:sqlite)** - Base de datos ligera embebida.

*   **Zod** - Validación de esquemas y datos de entrada.

*   **CORS** - Permite peticiones desde otros dominios (frontend).

*   **dotenv** - Manejo de variables de entorno.



## 📋 Características



*   Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar).

*   Paginación de resultados (`?page=1&limit=10`).

*   Validación de datos con Zod antes de llegar a la base de datos.

*   Manejo global de errores.

*   Arquitectura escalable (Patrón Repository).



---



## ⚙️ Requisitos previos



*   Tener **Node.js** instalado (versión 22.13 o superior para usar `node:sqlite`).

*   Tener **npm** (viene incluido con Node.js).



## 🚀 Instalación y ejecución



Sigue estos pasos para levantar el proyecto en tu máquina local:



1. **Clona el repositorio:**

   ```bash

   git clone https://github.com/DylanRe16/mi-api.git

   cd mi-api

   ```



2. **Instala las dependencias:**

   ```bash

   npm install

   ```



3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y añade lo siguiente:

   ```env

   PORT=3000

   # (Opcional) DB_ENGINE=sqlite

   ```



4. **Inicia el servidor:**

   

   Modo normal:

   ```bash

   node index.js

   ```

   Modo desarrollo (si tienes nodemon instalado):

   ```bash

   npm run dev

   ```



5. **La API estará corriendo en:** `http://localhost:3000`



## 🗺️ Estructura del proyecto



```text

mi-api/

├── .env

├── index.js                   # Punto de entrada del servidor

├── package.json

└── src/

    ├── app.js                 # Configuración de Express y middlewares

    ├── db/                 

    │   └── sqlite.js          # Conexión y configuración de la BD

    ├── routes/

    │   └── usuarios.routes.js # Definición de los endpoints

    └── repositories/

        └── usuarios.sqlite.js # Consultas SQL (Patrón Repository)

```



## 📡 Endpoints de la API



Todos los endpoints están bajo el prefijo `/usuarios`.



### 1. Obtener todos los usuarios (con paginación)

**URL:** `GET /usuarios?page=1&limit=10`



**Respuesta exitosa (200 OK):**

```json

{

    "page": 1,

    "limit": 10,

    "data": [

        {

            "id": 1,

            "nombre": "Ana",

            "email": "ana@test.com"

        }

    ]

}

```



### 2. Obtener un usuario por ID

**URL:** `GET /usuarios/:id`



**Respuesta exitosa (200 OK):**

```json

{

    "id": 1,

    "nombre": "Ana",

    "email": "ana@test.com"

}

```



### 3. Crear un nuevo usuario

**URL:** `POST /usuarios`



**Body (JSON):**

```json

{

    "nombre": "Carlos",

    "email": "carlos@test.com"

}

```

* **Respuesta exitosa (201 Created):** Devuelve el usuario con su ID asignado.

* **Respuesta de error (400 Bad Request):** Si los datos no cumplen con la validación de Zod.



### 4. Actualizar un usuario

**URL:** `PUT /usuarios/:id`



**Body (JSON):**

```json

{

    "nombre": "Carlos Actualizado",

    "email": "carlos_nuevo@test.com"

}

```



### 5. Eliminar un usuario

**URL:** `DELETE /usuarios/:id`



* **Respuesta exitosa (204 No Content):** Sin cuerpo en la respuesta.



---



## 🧪 Pruebas



Puedes importar la colección de Postman incluida en la carpeta `/postman` para probar todos los endpoints de forma rápida.



Si implementas pruebas automatizadas con Jest, ejecuta:

```bash

npm test

```



## 📝 Notas de desarrollo



* **Migración a otra BD:** Gracias a que usamos el patrón Repository, si en el futuro queremos cambiar de SQLite a PostgreSQL, solo debemos crear un nuevo archivo en `src/repositories/usuarios.postgres.js` y cambiar la importación en las rutas. El resto del código no se ve afectado.

* **Rutas de la BD:** La base de datos siempre se busca en la raíz del proyecto usando `path.join(__dirname, '..', '..', 'mi_api.db')` para evitar errores de rutas relativas.