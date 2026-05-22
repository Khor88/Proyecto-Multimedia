# Plan de Próxima Sesión: Refinamiento Estético y UX Senior

Este plan detalla las tareas de pulido visual para alinear el Dashboard y el Login con los estándares de diseño minimalista de alta gama.

## 1. Refuerzo de Marca en Login
- [ ] **LoginPage:** Aumentar el tamaño visual del logo `LogoFightClubX.png`.
  - Escalar de `120px` a `180px` o `200px` para que sea el centro de atención absoluto.
  - Ajustar márgenes superiores para equilibrar la composición tras el cambio de tamaño.

## 2. Simplificación del Dashboard (MainPage)
- [ ] **Limpieza de Texto:**
  - Eliminar el encabezado `<h1>Dashboard</h1>`.
  - Eliminar el texto secundario `"Gestión de competición amateur"`.
  - Objetivo: Que el usuario se centre exclusivamente en las acciones (iconos).

## 3. Rediseño de Botones de Acción (MainPage)
- [ ] **Optimización de Botones:** Refactorizar el estilo de los botones para `Combate Rápido`, `Torneos` y `Ligas`.
  - **Estructura:** Cambiar de botones tipo bloque estándar a tarjetas interactivas (`IonCard` o `div` clicleable).
  - **Integración de Iconos:** Hacer que los iconos (`CombatIcon`, etc.) sean más prominentes dentro del botón.
  - **Paleta de Colores:** 
    - Fondo: Negro puro o un gris extremadamente oscuro (#0D0D0D).
    - Bordes: Mantener el borde sutil (#1A1A1A).
    - Tipografía: Blanco puro para nombres de secciones.
    - Acento: Usar una pequeña barra lateral o borde inferior en Rosa Magenta solo para el botón de "Combate Rápido" para denotar prioridad.

## 4. Ajustes Globales de Estilo
- [ ] **Consistencia de Bordes:** Asegurar que todos los elementos interactivos compartan el mismo `border-radius: 12px`.
- [ ] **Verificación de Contraste:** Comprobar que el gris del texto de apoyo sea legible sobre el fondo negro absoluto.

---
*Este plan será ejecutado en la siguiente sesión para elevar la calidad visual al nivel de una aplicación profesional.*
