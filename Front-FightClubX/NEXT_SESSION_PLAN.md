# Plan de Próxima Sesión: Backend Integration y Persistencia

## 1. Refuerzo de Marca y Dashboard (Completado)
- [x] **LoginPage:** Aumentar el tamaño visual del logo `LogoFightClubX.png` (200px).
- [x] **Limpieza de Dashboard:** Eliminación de textos secundarios para enfoque en acciones.
- [x] **Rediseño de Botones:** Refactorización a tarjetas interactivas con iconos prominentes.

## 2. Refactorización de Ligas y Ranking (Completado)
- [x] **Navegación de Ligas:** Implementación de listado global y detalle dinámico mediante rutas.
- [x] **Descentralización del Ranking:** Integración de la clasificación dentro del detalle de cada liga.
- [x] **Calendario Dinámico:** Lógica real para generación de meses y resaltado de fecha actual.

## 3. Integración con Backend (Próxima Fase)
- [ ] **Setup de Axios/Fetch:** Configurar instancia base para llamadas a la API de Node.js.
- [ ] **Auth Service:** Implementar login real contra el backend y guardado de JWT en `localStorage`.
- [ ] **Data Fetching:** Sustituir `dummyLeagues` y `dummyMembers` por datos provenientes de la base de datos MariaDB.
- [ ] **Protección de Rutas:** Evitar el acceso a `/tabs/*` si no hay un token válido.

## 4. Mejoras de Funcionalidad
- [ ] **Creación de Liga:** Implementar el formulario funcional detrás del botón "+".
- [ ] **Gestión de Combates en Torneo:** Persistencia del estado de los brackets en el servidor.

---
*Este plan será ejecutado en la siguiente sesión para elevar la calidad visual al nivel de una aplicación profesional.*
