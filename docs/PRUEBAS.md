# Pruebas ejecutadas y límites

## Ejecutadas correctamente

- Auditoría GET del sitio de producción antes de los cambios: portada, sitemap, CSS, librerías y logo 200; robots.txt 404; ruta inexistente 404; URL QR inválida 200 sin X-Robots-Tag. Evidencia: `auditoria-http-antes.json`.
- Sintaxis JavaScript de app.js, seo-state.js y Edge Function.
- Validación de nueve documentos HTML (ocho páginas públicas y 404), recursos y enlaces internos existentes, IDs únicos, canonical, JSON-LD, XML, manifest y TOML. Evidencia: `pruebas-estaticas.json`.
- Prueba unitaria de Edge Function: añade noindex/no-store cuando existe q, conserva el cuerpo y deja pasar las peticiones públicas sin q.
- Prueba unitaria de seo-state.js: portada, estado privado, logout, callback de acceso y enlace QR. Generación de matrices SVG con la librería real para URL directa y dinámica.
- Chromium 153 mediante Playwright: generador sin cuenta, archivos descargados PNG/SVG, registro con validación de confirmación, login/logout, crear y editar QR conservando URL, pausar/activar, búsqueda, descargas del panel y redirección a la dirección devuelta por la RPC. **Supabase simulado**: no se accedió ni modificó la base de datos real.
- Chromium con JavaScript desactivado y viewport 390 × 844: ocho páginas legibles, HTTP 200 local, título y canonical correctos, sin desbordamiento horizontal; enlaces del desplegable accesibles.
- No se produjeron errores JavaScript de página durante los flujos ejecutados.
- Capturas de portada a 1440 px y 390 px y de una guía móvil, con animaciones terminadas para inspeccionar el contenido estable.

Evidencia detallada de navegador: `pruebas-navegador.json`. La descarga estándar del navegador falló; se pudo ejecutar un binario alternativo de Chromium. Los scripts de prueba quedan incluidos.

## No verificadas en este entorno

- Login, registro, RPC y permisos RLS contra Supabase real. La consulta de ajustes públicos de Auth devolvió 502; no determina la disponibilidad general del backend.
- Persistencia real de sesión entre dispositivos, entrega de correos y aislamiento entre dos cuentas reales.
- Ejecución de la Edge Function en Netlify, cabeceras/rutas del nuevo despliegue y normalización de URLs en el CDN. Solo se probó su lógica localmente.
- Indexación por Google, canonical elegido por Google, acceso a tu Search Console y aparición de resultados enriquecidos.
- Lighthouse o Core Web Vitals de campo, disponibilidad de fuentes en todos los países y compatibilidad exhaustiva con Safari/Firefox.
- Escaneo físico de códigos impresos con un teléfono.

No se ha desplegado la nueva versión. Las instrucciones de publicación incluyen las comprobaciones pendientes antes de dar por validada producción.
