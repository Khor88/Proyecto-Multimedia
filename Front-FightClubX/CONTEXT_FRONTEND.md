# Proyecto: FightClubX - Estado Actual y Contexto Técnico

## 1. Información General
- **Objetivo:** Aplicación móvil de deportes de contacto amateur.
- **Stack:** Ionic Framework + React + TypeScript + Vite.
- **Estética:** Minimalista "Pure Black" (#000000), acentos Rosa Magenta (#d91b5c), bordes sutiles (#1A1A1A).

## 2. Estructura de Navegación
- **Rutas Principales:**
  - `/login`: Pantalla de acceso (sin barra de navegación).
  - `/tabs`: Contenedor de navegación flotante minimalista.
    - `/tabs/main`: Dashboard principal.
    - `/tabs/calendar`: Próximos eventos (lógica de fecha real).
    - `/tabs/user`: Perfil de usuario.
- **Páginas Secundarias:**
  - `/combat`: Interfaz de arbitraje con cronómetro de rounds y descansos.
  - `/tournament`: Visualización de cuadros de torneo (brackets) y gestión de combates.
  - `/league`: Listado de ligas del usuario con opción de añadir nueva (+).
  - `/league/:id`: Detalle dinámico de una liga específica (miembros, estadísticas, gestión).
  - `/league/:id/ranking`: Clasificación específica de la liga seleccionada.

## 3. Componentes y Funcionalidades Implementadas
- **Login:** Formulario minimalista con logo de gran tamaño (200px), campos de email/password.
- **Dashboard:** Tarjetas interactivas con iconos prominentes y diseño minimalista.
- **Combat Interface:**
  - Cronómetro que alterna entre Round y Descanso.
  - Configuración de tiempos y rounds.
- **Ligas (Refactorizado):**
  - Pantalla de listado centralizada.
  - Navegación a detalle dinámico por ID.
  - Acceso a clasificación desde cada liga.
- **Calendario (Dinámico):**
  - Generación automática del grid del mes actual.
  - Resaltado visual del día actual y eventos próximos.
- **Ranking:** Lista dinámica adaptada al contexto de cada liga.
- **Navigation:** Barra de pestañas (Tabs) flotante con efecto blur, sin ranking global.

## 4. Assets y Recursos
- Ubicación de imágenes: `src/images/`
- Archivos clave: `CombatIcon.png`, `LeagueIcon.png`, `TournamentIcon.png`, `LogoFightClubX.png`.
- Importación: Se realiza mediante `import` directo en los componentes para compatibilidad con Vite.

## 5. Pendientes (Próximas Sesiones)
- [ ] Conectar el Frontend con la API de Node.js (Backend).
- [ ] Implementar la persistencia de sesión con JWT.
- [ ] Lógica real de generación de brackets desde el servidor.
- [ ] Integración de notificaciones push o sonidos para el cronómetro de combate.
- [ ] Gestión real de carga de imágenes de perfil de luchadores.

---
*Este archivo resume el trabajo realizado hasta el 22 de mayo de 2026.*
