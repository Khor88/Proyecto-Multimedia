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
    - `/tabs/calendar`: Próximos eventos.
    - `/tabs/ranking`: Clasificación global.
    - `/tabs/user`: Perfil de usuario.
- **Páginas Secuendarias:**
  - `/combat`: Interfaz de arbitraje con cronómetro de rounds y descansos (configurable en minutos).
  - `/tournament`: Visualización de cuadros de torneo (brackets).
  - `/league`: Gestión de miembros y reglas de liga.

## 3. Componentes y Funcionalidades Implementadas
- **Login:** Formulario minimalista con logo, campos de email/password y botones de acceso/registro.
- **Dashboard:** Botones grandes con iconos personalizados (`CombatIcon`, `TournamentIcon`, `LeagueIcon`).
- **Combat Interface:**
  - Cronómetro que alterna entre Round y Descanso.
  - Configuración de tiempos en minutos mediante un modal.
  - Función de "Finalizar Combate" que reinicia el estado y los rounds.
- **Ranking:** Lista dinámica con visualización de victorias, derrotas y puntos.
- **Brackets:** Diseño visual de semifinales y final.
- **Navigation:** Barra de pestañas (Tabs) flotante con efecto blur y diseño de gama alta.

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
