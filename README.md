# 🔐 API de Autenticación (Registro y Login)

Un microservicio RESTful para la gestión de usuarios y autenticación. Construido con **Node.js**, **Express** y **SQLite**. Implementa hashing de contraseñas con **bcryptjs**, validación de datos con **Zod** y generación de Tokens de acceso con **JWT** (JSON Web Tokens).

## 🛠️ Tecnologías utilizadas
 
*   **Node.js** - Entorno de ejecución.
*   **Express** - Framework web.
*   **SQLite (node:sqlite)** - Base de datos ligera embebida.
*   **bcryptjs** - Hasheo seguro de contraseñas.
*   **jsonwebtoken (JWT)** - Generación y verificación de tokens de sesión.
*   **Zod** - Validación de esquemas y datos de entrada.
*   **dotenv** - Manejo de variables de entorno.
*   **CORS** - Permitir peticiones desde el frontend.

## 📋 Características

*   Registro de usuarios con contraseñas encriptadas (nunca se guardan en texto plano).
*   Inicio de sesión (Login) con verificación de credenciales.
*   Generación de Tokens JWT para sesiones seguras.
*   Middleware de protección para rutas privadas.
*   Arquitectura escalable (Patrón Repository).

---

## ⚙️ Requisitos previos

*   Tener **Node.js** instalado (versión 22.13 o superior para usar `node:sqlite`).
*   Tener **npm** (viene incluido con Node.js).

## 🚀 Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/DylanRe16/Api-login-regiter.git
   cd Api-login-regiter
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Copia el archivo de ejemplo y renómbralo:
   ```bash
   cp .env.example .env
   # (En Windows PowerShell sería: copy .env.example .env)
   ```
   Abre el `.env` y configura tus variables (ej. tu clave secreta JWT).

4. **Inicia el servidor:**
   ```bash
   node index.js
   ```

5. **La API estará corriendo en:** `http://localhost:3000`

## 🗺️ Estructura del proyecto

```text
mi-api-auth/
├── .env
├── .env.example
├── .gitignore
├── index.js                   # Punto de entrada
├── package.json
└── src/
    ├── app.js                 # Configuración de Express
    ├── db/                     
    │   └── sqlite.js          # Conexión y creación de la tabla
    ├── middlewares/
    │   └── auth.middleware.js # Verificación del Token JWT
    ├── routes/
    │   └── auth.routes.js     # Endpoints de registro y login
    └── repositories/
        └── usuarios.sqlite.js # Consultas SQL (Patrón Repository)
```

## 📡 Endpoints de la API

### 1. Registro de Usuario
Crea un nuevo usuario en el sistema. La contraseña se encripta antes de guardarse.

*   **URL:** `POST /api/auth/registro`
*   **Body (JSON):**
    ```json
    {
        "cedula": 12345678,
        "password": "mi_clave_segura"
    }
    ```
    *(Nota: La cédula va sin comillas porque es un número, la contraseña va entre comillas porque es texto).*

*   **Respuesta exitosa (201 Created):**
    ```json
    {
        "mensaje": "Usuario registrado exitosamente",
        "usuario": {
            "id": 1,
            "cedula": 12345678,
            "fecha_creacion": "2024-05-20T10:00:00.000Z"
        }
    }
    ```

### 2. Inicio de Sesión (Login)
Verifica las credenciales y devuelve un Token JWT para acceder a rutas protegidas.

*   **URL:** `POST /api/auth/login`
*   **Body (JSON):**
    ```json
    {
        "cedula": 12345678,
        "password": "mi_clave_segura"
    }
    ```

*   **Respuesta exitosa (200 OK):**
    ```json
    {
        "mensaje": "Login exitoso",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY2VkdWxhIjoxMjM0NTY3OCwiaWF0IjoxNzE2MjA..."
    }
    ```

### 3. Ruta Protegida (Ejemplo)
Endpoint de prueba que requiere enviar el Token JWT en la cabecera.

*   **URL:** `GET /api/perfil`
*   **Headers requeridos:**
    *   `Authorization: Bearer <TU_TOKEN_JWT_AQUI>`

*   **Respuesta exitosa (200 OK):**
    ```json
    {
        "mensaje": "Bienvenido a tu perfil",
        "datos": {
            "id": 1,
            "cedula": 12345678,
            "iat": 1716200000,
            "exp": 1716286400
        }
    }
    ```

## 🧪 Pruebas (Postman)

1. Haz un `POST` a `/api/auth/registro` para crear tu cuenta.
2. Haz un `POST` a `/api/auth/login` con las mismas credenciales. Copia el token que te devuelva la respuesta.
3. Haz un `GET` a `/api/perfil`. Ve a la pestaña Headers y añade:
   *   **Key:** `Authorization`
   *   **Value:** `Bearer TU_TOKEN_COPIADO_AQUI`
4. ¡Dale a Send! Si el token es válido, verás tu perfil. Si no, recibirás un error `401 Unauthorized` o `403 Forbidden`.

## 📝 Notas de seguridad

*   **Contraseñas:** Nunca se guardan en texto plano. `bcryptjs` genera un hash seguro (con 10 rondas de sal).
*   **Tokens:** El token tiene un tiempo de expiración (configurado en el `.env` como `JWT_EXPIRES_IN`). Una vez expirado, el usuario deberá loggearse de nuevo.
*   **Archivos sensibles:** El archivo `.env` real está excluido del repositorio mediante `.gitignore` para proteger las claves secretas.

---
