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

### Fase 1: Setup y Migración (Infraestructura) - ✅ COMPLETADO
1.  **Inicialización de TypeScript:** Configuración de `tsconfig.json` y dependencias. ✅
2.  **Estructura de Directorios:** Implementada arquitectura de capas. ✅
3.  **Configuración de Base de Datos:** Conexión con MariaDB y script de inicialización (`schema.sql`). ✅

### Fase 2: Autenticación y Usuarios - ✅ COMPLETADO (Básico)
1.  **Modelo de Usuario:** Atributos de perfil y roles implementados. ✅
2.  **Auth JWT:** Registro, Login y validación de tokens integrados con el front. ✅
3.  **Gestión de Perfil:** Visualización de datos biométricos reales en el front. ✅

### Fase 3: Módulo de Ligas y Torneos - 🔄 EN PROCESO
1.  **CRUD de Ligas:** Integración con las pantallas de creación y configuración del front. (Pendiente conectar formulario de creación a la DB).
2.  **Módulo de Torneos:** Lógica para creación de torneos dentro de ligas.
3.  **Generación de Brackets:** Algoritmo para emparejamientos automáticos.

### Fase 4: Combates y Cronómetro - 🔄 EN PROCESO
1.  **Gestión de Combates:** Endpoint de calendario real implementado. ✅
2.  **Resultados:** Endpoint para registrar ganadores (Pendiente).
3.  **Sincronización con el Cronómetro:** (Pendiente).

### Fase 5: Estadísticas y Rankings - ⏳ PENDIENTE
1.  **Cálculo Automático:** Lógica de actualización de ranking tras combate.
2.  **Endpoints de Ranking:** Proporcionar datos filtrados por liga.

## 4. Estado Actual de la Integración
- **Backend:** Corriendo en `localhost:3000` con TypeScript y conexión MariaDB verificada. ✅
- **Frontend:** Conectado mediante Axios (`api.ts`) apuntando a `localhost:3000`. ✅
- **Base de Datos:** MariaDB activa con esquema real y script de seed funcional. ✅
- **Funcionalidades:** Autenticación (Login/Registro), Perfil de usuario, Ligas y Calendario integrados con datos reales. ✅

---
*Estado: Desarrollo estable en entorno local.*

## 6. Sprints de Trabajo
| Sprint | Tarea |
| :--- | :--- |
| **Sprint 01** | Migración TS, Configuración DB y Auth Base. |
| **Sprint 02** | Gestión de Ligas y Perfiles de Usuario. |
| **Sprint 03** | Lógica de Combates, Torneos y Brackets. |
| **Sprint 04** | Sistema de Rankings e Integración Final. |

---
*Este plan está sujeto a cambios según la evolución del desarrollo.*
