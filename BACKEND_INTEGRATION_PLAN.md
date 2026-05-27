# Plan de Creación e Integración del Backend - FightClubX

Este documento detalla la estrategia para reconstruir e integrar el backend de **FightClubX**, asegurando una sincronización total con el frontend actual y cumpliendo con las especificaciones técnicas del proyecto.

## 1. Objetivos Principales
- **Migración a TypeScript:** Todo el backend será refactorizado a TypeScript para coherencia con el frontend y seguridad de tipos.
- **Implementación de MariaDB:** Diseño y despliegue del esquema relacional completo.
- **API REST Robusta:** Cobertura total de CRUDs y lógica de negocio (Rankings, Brackets).
- **Integración con el Front:** Asegurar que las interfaces del frontend coincidan exactamente con las respuestas del servidor.

## 2. Arquitectura Propuesta
Se seguirá una arquitectura de capas limpia:
- **Routes:** Definición de endpoints.
- **Controllers:** Manejo de peticiones y respuestas HTTP.
- **Services:** Lógica de negocio pura (cálculos de ranking, emparejamientos).
- **Models/Entities:** Interacción con la base de datos (usando Sequelize o TypeORM para MariaDB).
- **Middlewares:** Autenticación (JWT), validación de esquemas (Zod/Joi) y manejo de errores.

## 3. Fases de Implementación

### Fase 1: Setup y Migración (Infraestructura)
1.  **Inicialización de TypeScript:** Configuración de `tsconfig.json` y dependencias (`ts-node`, `typescript`, `@types/*`).
2.  **Estructura de Directorios:**
    ```
    src/
    ├── config/         # DB, Variables de Entorno
    ├── controllers/    # Controladores de API
    ├── interfaces/     # Definiciones de tipos/interfaces
    ├── middlewares/    # Auth, Logger, ErrorHandler
    ├── models/         # Entidades de Base de Datos
    ├── routes/         # Definición de rutas
    ├── services/       # Lógica de negocio (Servicios)
    └── utils/          # Helpers (JWT, Hash)
    ```
3.  **Configuración de Base de Datos:** Conexión con MariaDB y script de inicialización de tablas.

### Fase 2: Autenticación y Usuarios
1.  **Modelo de Usuario:** Atributos de perfil (peso, altura, disciplina) y roles.
2.  **Auth JWT:** Registro, Login y validación de tokens.
3.  **Gestión de Roles:** Middlewares para proteger rutas basadas en el rol (ej. solo Presidentes crean ligas).

### Fase 3: Módulo de Ligas y Torneos
1.  **CRUD de Ligas:** Integración con las pantallas de creación y configuración del front.
2.  **Módulo de Torneos:** Lógica para creación de torneos dentro de ligas.
3.  **Generación de Brackets:** Algoritmo para emparejamientos automáticos basados en peso/categoría.

### Fase 4: Combates y Cronómetro
1.  **Gestión de Combates:** Registro de fechas, participantes y tipos de combate.
2.  **Resultados:** Endpoint para registrar ganadores y métodos de victoria.
3.  **Sincronización con el Cronómetro:** Asegurar que el estado del combate sea persistente.

### Fase 5: Estadísticas y Rankings
1.  **Cálculo Automático:** Cada vez que se registra un combate, el servicio de Ranking debe actualizar las posiciones de la liga correspondiente.
2.  **Endpoints de Ranking:** Proporcionar datos filtrados por liga para la visualización en el front.

## 4. Modificaciones Necesarias en el Backend Actual
- **Refactorizar `server.js` y `app.js`** a sintaxis de módulos ES y TypeScript.
- **Eliminar controladores `.js` existentes** y reemplazarlos por versiones `.ts` que manejen correctamente las interfaces.
- **Actualizar `package.json`** con los scripts necesarios (`dev`, `build`, `start`).
- **Implementar Validaciones:** Añadir validación de datos de entrada para evitar errores 500.

## 5. Alineación con el Frontend
1.  **Tipos Compartidos:** Los modelos del backend deben ser la fuente de verdad para las interfaces del frontend.
2.  **Manejo de CORS:** Configurar correctamente para permitir peticiones desde el entorno de desarrollo de Ionic/Vite.
3.  **Endpoints Dinámicos:** Asegurar que rutas como `/league/:id/config` funcionen con los IDs reales de la base de datos.

## 6. Sprints de Trabajo
| Sprint | Tarea |
| :--- | :--- |
| **Sprint 01** | Migración TS, Configuración DB y Auth Base. |
| **Sprint 02** | Gestión de Ligas y Perfiles de Usuario. |
| **Sprint 03** | Lógica de Combates, Torneos y Brackets. |
| **Sprint 04** | Sistema de Rankings e Integración Final. |

---
*Este plan está sujeto a cambios según la evolución del desarrollo.*
