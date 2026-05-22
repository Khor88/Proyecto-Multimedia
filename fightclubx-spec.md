# OpenSpec: FightClubX - Gestión de Eventos de Combate Amateur

## 1. Información del Proyecto
- **Nombre:** FightClubX
- **Autor:** Pablo Méndez García
- **Contexto:** Proyecto de 1º DAM (Desarrollo de Aplicaciones Multiplataforma).
- **Descripción:** Plataforma para la organización de eventos, ligas y torneos de deportes de contacto amateur.

## 2. Stack Tecnológico
- **Frontend:** Ionic Framework + React + TypeScript.
- **Backend:** Node.js + Express + TypeScript.
- **Base de Datos:** MariaDB (Aiven / Local).
- **Despliegue:** Render (Backend).
- **Herramientas:** Gemini CLI para ingeniería de prompts y generación de código.

## 3. Modelo de Datos (Esquema Relacional)
El sistema debe implementar y gestionar las siguientes entidades en MariaDB:

### 3.1. Usuarios y Roles
- `usuario`: (id, nombre, email, password, peso, altura, edad, disciplina).
- **Roles:** Presidente, Vicepresidente, Luchador, Árbitro, Espectador.

### 3.2. Estructura de Competición
- `liga`: (id, nombre, reglas, id_usuario_creador).
- `torneo`: (id, nombre, formato, id_liga).
- `combate`: (id, tipo, num_rounds, duracion_round, estado, fecha, id_liga).
- `participante_combate`: (id_combate, id_usuario, rol_en_combate).
- `resultado_combate`: (id_combate, id_ganador, metodo, observaciones).

### 3.3. Estadísticas
- `ranking`: (id_liga, id_usuario, victorias, derrotas, posicion).

## 4. Requisitos Funcionales (Core)
### 4.1. Backend (API REST)
- Autenticación mediante JWT.
- CRUD completo para Usuarios, Ligas y Combates.
- Lógica de generación de Brackets (emparejamientos automáticos para torneos).
- Actualización automática de Rankings tras registrar un resultado.

### 4.2. Frontend (Mobile First)
- **UI/UX:** Dark Mode, color principal Magenta/Rosa (basado en logo).
- **Dashboard:** Accesos rápidos a "Combate Rápido", "Torneos" y "Ligas".
- **Sistema de Cronómetro:** Interfaz para árbitros con control de tiempo y rounds.

## 5. Directrices de Desarrollo para Gemini CLI
1.  **Arquitectura:** Mantener una separación clara entre Capa de Datos (Modelos), Lógica (Servicios) y Controladores.
2.  **Seguridad:** No exponer credenciales; utilizar variables de entorno (`.env`).
3.  **Tipado:** Todo el código (Back y Front) debe ser estrictamente typed con TypeScript.
4.  **Consistencia:** Las interfaces del Frontend deben derivar de las respuestas JSON definidas en el Backend.

## 6. Flujo de Trabajo (Sprints)
- **S01:** Setup de Base de Datos y Auth.
- **S02:** Gestión de Perfiles y Roles.
- **S03:** Lógica de Combates y Cronómetro.
- **S04:** Torneos, Ligas y Ranking Final.

---
*Instrucción para el Agente:* "Actúa como desarrollador principal. Lee este spec y mantén la coherencia entre el repositorio del Backend y el del Frontend en todo momento."