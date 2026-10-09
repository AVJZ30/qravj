# AVJ QR Studio — implementación SEO

Fecha: 9 de octubre de 2026. Sitio: https://qravj.netlify.app/.

## Resultado y alcance

Se optimizó el proyecto adjunto y se preparó una versión desplegable en Netlify. Incluye la herramienta original, siete guías públicas, metadatos, datos estructurados, sitemap, robots.txt y control de indexación de enlaces QR. El sitio de producción no se ha reemplazado. No se modificaron datos, contraseñas, políticas RLS, SQL ni configuración de autenticación.

No se prometen primeras posiciones, visitas ni indexación de todas las páginas. La arquitectura amplía las respuestas útiles que Google puede descubrir. Las cifras de resultados deben obtenerse de Search Console tras publicar.

## 1. Errores y oportunidades encontrados

| Hallazgo | Evidencia | Acción |
|---|---|---|
| Pantalla pública oculta inicialmente | `auth-screen` tenía `hidden` en el HTML adjunto | Se entrega visible en HTML; el panel privado continúa oculto y requiere sesión |
| Título poco descriptivo | `AVJ · QR Studio` | Título orientado a generación y descargas reales |
| Sin canonical, Open Graph ni Twitter Cards | Inspección del HTML | Metadatos propios en las ocho páginas públicas |
| Sin JSON-LD | Inspección del HTML | WebSite, Organization, WebApplication y WebPage/BreadcrumbList según la página |
| robots.txt ausente en producción | GET respondió 404 | Archivo creado con acceso público y referencia al sitemap |
| Sitemap limitado a portada | Archivo adjunto y GET 200 en producción | Ocho URLs públicas canónicas; sin URLs QR ni sesiones |
| Logo pesado | PNG de 1.918.798 bytes para un uso habitual de 48 px | WebP de 224 × 224 y 27.358 bytes para pantalla; original conservado |
| Fuente cargada mediante CSS `@import` | styles.css | Enlace directo desde HTML y preconnect a los proveedores de fuentes |
| Manifest sin nombre | name y short_name vacíos | Identidad, idioma, scope y start_url completados |
| QR de redirección sin X-Robots-Tag | GET `/?q=no-valido` respondió 200, sin cabecera | Edge Function por presencia del parámetro `q`, con noindex y no-store |
| Carpeta de adjuntos aplanada | HTML esperaba assets/ y vendor/ | Se reconstruyeron esas carpetas; en producción las rutas originales ya respondían 200 |
| Páginas informativas ausentes | No estaban en los archivos adjuntos | Siete guías originales, accesibles sin cuenta ni JavaScript |

La URL inexistente comprobada en producción ya devolvía 404 correctamente. Se añade una página de error con identidad AVJ, sin convertir rutas desconocidas en respuestas 200. No se afirma que hubiera un problema de soft 404.

## 2. Funciones confirmadas en el código

- **Sin cuenta:** valida URL HTTP/HTTPS, genera el patrón QR localmente y exporta PNG/SVG. No guarda ese QR en el panel.
- **Con cuenta:** crea registros en `qr_links`; el backend asigna la URL pública. El panel permite buscar por nombre, destino o nota, editar y pausar/activar.
- **QR dinámico:** mantiene `public_url` al editar el destino. El lector usa `?q=` y la RPC `resolve_qr` para consultar la dirección activa.
- **Registro:** correo, contraseña de al menos ocho caracteres y confirmación. El código comprueba que el registro inmediato esté habilitado (`mailer_autoconfirm`). No se promete que siempre esté disponible.
- **Sesiones:** las maneja Supabase. Se conservaron las opciones originales de persistencia y los flujos de login/logout.
- **No confirmado/ofrecido:** estadísticas de escaneos, personalización avanzada, generación WiFi/vCard, borrado de códigos, alojamiento de catálogos, gratuidad ilimitada o duración garantizada.

La clave `sb_publishable_` del cliente es pública por diseño. Se conservó exactamente `config.js`. No se incluyó una clave privada. El SEO no sustituye la autorización de Supabase: no se auditaron ni cambiaron las políticas RLS porque no se aportó su SQL ni acceso administrativo.

La consulta de solo lectura a los ajustes públicos de Auth devolvió 502 desde este entorno. No permite concluir que exista una caída general ni confirmar su configuración actual. No se crearon cuentas ni se leyeron registros privados.

Las pruebas de navegador con Supabase simulado pasaron para generación, descarga, registro/login, creación/edición, pausa y búsqueda. Los límites y evidencias completos figuran en `PRUEBAS.md`.

## 3. Arquitectura y palabras clave

Investigación cualitativa de intención, revisión de resultados de búsqueda en español y comprobación con las funciones implementadas. No se usaron herramientas de volumen ni se inventaron competencia, posiciones o tráfico. La prioridad expresa adecuación al producto, no facilidad de posicionamiento.

| Página | Intención / prioridad | Palabra principal | Secundarias naturales |
|---|---|---|---|
| `/` | Usar herramienta / alta | Generador de códigos QR | Generador QR online; crear QR gratis; generar QR gratis; generador QR en español; AVJ QR Studio; AVJ COMUNITY QR |
| `/crear-codigo-qr/` | Procedimiento / alta | Crear código QR | Código QR para enlaces; convertir enlace a QR; convertir URL a código QR; generar QR sin complicaciones |
| `/qr-dinamico/` | Entender y editar / alta | Crear QR dinámico | Crear QR editable; cambiar enlace de un QR; modificar destino de QR |
| `/descargar-qr/` | Exportar y elegir formato / alta | Descargar código QR | Descargar QR PNG; descargar QR SVG |
| `/administrar-codigos-qr/` | Usar cuenta y panel / alta | Administrar códigos QR | Gestor de códigos QR; AVJ QR Studio |
| `/qr-para-negocios/` | Casos de uso / media | Crear códigos QR para negocios | QR para catálogos digitales; QR para redes sociales; QR para promociones; QR para páginas web |
| `/blog/que-es-un-codigo-qr/` | Aprender conceptos / media | Qué es un código QR | Para qué sirve un código QR; qué es un generador de códigos QR |
| `/blog/qr-estatico-vs-dinamico/` | Comparar / alta | QR estático vs dinámico | Diferencia entre QR estático y dinámico; crear QR permanente, tratado como duda con límites claros |

**Consultas condicionadas:** «código QR dinámico gratis» no se usa como promesa comercial: el código aportado no muestra cobro, pero no acredita condiciones, cuotas ni disponibilidad ilimitada del servicio. «Crear QR permanente» se responde explicando que la URL se conserva al editar; no se garantiza una duración indefinida. Las búsquedas con “gratis” se asignan al generador directo sin cuenta, donde la función está confirmada.

**Páginas propuestas que se consolidaron:** `/generador-qr` con la portada; `/qr-para-enlaces` y `/blog/como-crear-un-codigo-qr` con `/crear-codigo-qr/`; `/descargar-qr-png` y `/descargar-qr-svg` con `/descargar-qr/`; `/blog/como-funciona-un-qr-dinamico` con `/qr-dinamico/`. No se crearon copias ni redirecciones para URLs cuya existencia anterior no está acreditada. Cada guía responde a una tarea diferente y enlaza la herramienta y las guías relacionadas.

## 4. Metadatos finales

Los títulos, descripciones, keywords y URLs exactos se incluyen también en `metadatos-y-palabras-clave.json`. La sección al final de este informe los reproduce íntegramente.

- Canonical absoluto y autorreferente en cada página pública.
- Idioma español en HTML y datos estructurados.
- Open Graph y Twitter con título, descripción y logo reales; no se inventa una cuenta social.
- `WebApplication` es un subtipo de `SoftwareApplication`; no se duplican entidades para describir la misma aplicación.
- No se inventan reseñas, valoraciones, ofertas o precios para obtener un resultado enriquecido. El marcado descriptivo no implica elegibilidad para el resultado enriquecido de software de Google.
- BreadcrumbList refleja las migas visibles de las guías. No se inventa una página de blog intermedia inexistente.
- Portada: se conserva su titular visual. La semántica se mejora con un landmark principal en el generador público; los H1 del panel y de redirección pertenecen a vistas ocultas alternativas.
- El desplegable de guías es un `<details>` nativo: sus enlaces existen en HTML y cualquier visitante puede abrirlo. No contiene texto invisible creado para buscadores.

## 5. Indexación, privacidad y URLs

`robots.txt` permite rastrear los recursos públicos y anuncia `https://qravj.netlify.app/sitemap.xml`. No se bloquea `?q=` en robots.txt, para que el robot pueda leer el `noindex` de la respuesta.

La Edge Function `qr-indexing` añade `X-Robots-Tag: noindex, nofollow, nosnippet` y `Cache-Control: private, no-store` a las peticiones que incluyan `q`, incluso vacío o inválido. Conserva cuerpo, estado, URL y lógica de redirección originales; no consulta Supabase ni modifica tokens. No se cambia la dirección de códigos ya impresos. El script pequeño `seo-state.js` aporta un respaldo cliente, retira el canonical/JSON-LD de la vista QR y excluye los estados autenticados y callbacks con tokens.

El panel comparte URL con la portada, pero sus datos solo se solicitan después de tener una sesión. No se generan páginas públicas con correos, notas o filas del panel. El estado autenticado añade noindex; la portada anónima sigue siendo indexable. `noindex` no es una barrera de seguridad: el aislamiento real sigue dependiendo de Auth y RLS.

No hay regla global de SPA `/* /index.html 200`. Las rutas desconocidas deben seguir devolviendo 404 en Netlify. `_redirects` normaliza `/index.html` y el nombre del adjunto `/index(6).html` hacia `/`, conservando los parámetros según el comportamiento de Netlify. Las guías usan directorios con barra final y canonical coherente. Hay que verificar la normalización en el despliegue real.

## 6. Rendimiento y diseño

- El recurso de logo solicitado por la interfaz baja aproximadamente un **98,6 %** en bytes. Se mantiene su ilustración, proporción y dimensiones HTML; el PNG original sigue disponible para referencias previas.
- Fuentes originales, pesos, colores, botones y animaciones conservados. Carga mediante enlaces tempranos y preconnect, manteniendo `display=swap`.
- Scripts originales siguen siendo `defer`; las guías no cargan Supabase, el generador QR ni los scripts de aplicación.
- Imágenes con dimensiones explícitas; CSS de las guías aislado de componentes originales.
- Caché de un día para assets/vendor con revalidación; HTML revalidado y config.js sin almacenamiento. No se usa `immutable` sobre nombres no versionados.
- Cambio visible acotado: selector desplegable de guías junto al contenido del generador y mención de PNG/SVG en la frase existente. No hay grandes bloques añadidos a portada.

No se atribuyen valores de LCP, INP, CLS, Lighthouse o mejora real de tráfico sin medirlos. Se comprobó en Chromium el contenido móvil a 390 px sin desbordamiento, junto con capturas de escritorio y móvil. Esto no sustituye métricas de campo ni pruebas en otros navegadores; consultar `PRUEBAS.md`.

## 7. Archivos

**Modificados:** `index(6).html` se entrega como `public/index.html`; `public/styles.css`; `public/app.js` (una llamada al actualizador de robots al mostrar sesión); `public/site.webmanifest`; `public/sitemap.xml`.

**Nuevos:** `public/seo-state.js`, `public/assets/avj-logo.webp`, `public/robots.txt`, `public/_headers`, `public/_redirects`, `public/404.html`, los siete directorios de guías con `index.html`, `netlify.toml`, `netlify/edge-functions/qr-indexing.js`, pruebas y documentación.

**Conservados:** `config.js`, `guest.js`, librerías QR/Supabase, licencias, verificación de Google, favicon e iconos. Las dependencias se colocan en `public/vendor/` y el logo en `public/assets/`, como esperaba el HTML original. La configuración de publicación incluye solo `public`, excluyendo informes, pruebas y código de Edge Functions del contenido estático.

## 8. Publicación en Netlify

1. Descomprime el proyecto. Conserva una copia del despliegue anterior o su identificador para poder restaurarlo.
2. Utiliza el **mismo sitio Netlify** de `qravj.netlify.app`. No cambies ese dominio ni `PUBLIC_BASE_URL`: son parte de los QR dinámicos ya emitidos.
3. Método recomendado: coloca el proyecto en el repositorio conectado al sitio. El directorio que contiene `netlify.toml` debe ser la base del proyecto y el directorio de publicación debe ser `public`. No requiere comando de compilación.
4. Alternativa por CLI, desde la carpeta del proyecto: `npx netlify-cli login`, `npx netlify-cli link` (selecciona el sitio existente), `npx netlify-cli deploy --build`. Revisa el despliegue de prueba. Después usa `npx netlify-cli deploy --build --prod` para producción.
5. **No uses solo arrastrar la carpeta `public`** para el resultado completo: la función Edge necesita desplegarse mediante integración Git o CLI. Subir únicamente los archivos estáticos dejaría el respaldo JavaScript de noindex, pero no la cabecera HTTP de `?q=`.
6. Comprueba en Netlify que aparezca la Edge Function `qr-indexing`. Revisa cualquier límite o condición del plan antes de activar el despliegue.
7. En producción verifica respuestas 200 para portada, guías, sitemap y robots; 404 real para una ruta inventada; 301 para `/index.html`; canonical de cada página; y `X-Robots-Tag` en `/?q=prueba-invalida`. No hace falta usar un token de cliente para esta última comprobación.
8. Prueba un QR estático, PNG/SVG, registro autorizado, login, sesión persistida, crear/editar/pausar/reactivar un QR de prueba y volver a escanear su imagen antigua. Usa tu cuenta de prueba y conserva los códigos de clientes.
9. En un despliegue de prueba, los QR generados siguen apuntando al dominio de producción porque la configuración original se conserva. No cambies esa base para una simple verificación SEO.
10. Si falla una función real, restaura el despliegue anterior desde Netlify. No ejecutes migraciones SQL para estos cambios SEO.

Comprobaciones de cabeceras sugeridas: `curl -I https://qravj.netlify.app/`, `curl -I 'https://qravj.netlify.app/?q=prueba-invalida'` y `curl -I https://qravj.netlify.app/ruta-inexistente-seo`.

## 9. Google Search Console

1. Abre o añade la propiedad de prefijo `https://qravj.netlify.app/`. Se conserva `google1c07a13158ec380f.html`; comprueba que la propiedad use esa verificación o la que ya tenías. No se da por confirmada la verificación de tu cuenta.
2. Tras publicar, envía `https://qravj.netlify.app/sitemap.xml` en Sitemaps.
3. Inspecciona portada y una guía con «Probar URL publicada». Revisa HTML recibido/renderizado, recursos y canonical declarado. Solicita indexación de páginas principales de forma razonable.
4. Inspecciona una URL QR de prueba: debe quedar excluida por noindex. No solicites indexación de códigos individuales, estados de acceso ni datos del panel.
5. Revisa «Indexación de páginas»: distingue errores de las exclusiones intencionales. “Rastreada: actualmente sin indexar” no obliga a crear más páginas ni a repetir keywords.
6. Valida datos estructurados con Schema Markup Validator y la Prueba de resultados enriquecidos. Que WebApplication no cumpla requisitos para un resultado enriquecido no justifica inventar estrellas/precios.
7. Revisa Core Web Vitals e informes de PageSpeed Insights después de publicar. Una web pequeña puede no disponer de suficientes datos de campo. No se inventa una aprobación móvil de Search Console.
8. Exporta Rendimiento por consulta, página, país y dispositivo; separa búsquedas de marca de búsquedas genéricas. Compara períodos equivalentes.

## 10. Variantes de CTR para evaluar

Estas son alternativas futuras, no etiquetas simultáneas. Cambia una variable por período y registra la fecha. Google puede mostrar un título o fragmento distinto al propuesto.

| Página | Variante de título | Variante de descripción |
|---|---|---|
| `/` | Crear QR gratis sin registro: PNG y SVG · AVJ | Convierte un enlace en un código QR y descarga su imagen. Para cambiar destinos después, crea tus QR dinámicos desde una cuenta de AVJ QR Studio. |
| `/` | Generador QR online en español · AVJ QR Studio | Pega tu enlace, genera el QR y descarga PNG o SVG. Accede al panel para organizar tus códigos dinámicos y actualizar sus destinos. |
| `/qr-dinamico/` | Cambiar el enlace de un QR dinámico · AVJ | Aprende a editar el destino desde tu panel y conservar la imagen impresa. Conoce también cómo pausar y reactivar tus códigos QR. |
| `/descargar-qr/` | QR en PNG o SVG: cómo elegir y descargar · AVJ | Descubre qué formato usar en documentos o impresión y cómo descargar tus códigos desde el generador y el panel de AVJ QR Studio. |

Evalúa CTR junto con impresiones, consulta y posición media: un cambio en la mezcla de consultas puede variar el CTR sin que el texto haya empeorado. Evita concluir con muestras muy pequeñas.

## 11. Medición a 30, 60 y 90 días

El día 0 es la fecha efectiva de publicación, no la de este informe.

| Momento | Medición | Decisión |
|---|---|---|
| Día 0 | Exportar línea base disponible: clics, impresiones, CTR, posición, páginas indexadas y estado técnico. Registrar fecha y versión publicada. | Conservar referencia para comparar; no asignar metas numéricas sin datos. |
| Día 30 | Verificar lectura del sitemap, descubrimiento e indexación por URL; excluir q; revisar consultas emergentes, errores y experiencia móvil. | Resolver problemas técnicos y aclarar contenido si Google o usuarios no identifican su propósito. |
| Día 60 | Comparar últimos 28 días con los 28 previos por página/consulta/dispositivo, separando marca. Identificar páginas con impresiones relevantes y pocos clics. | Probar una variante de título/descripción; ampliar una guía solo ante una necesidad distinta y real. |
| Día 90 | Revisar tendencia desde la línea base, cobertura de consultas, conversiones disponibles y Core Web Vitals. Detectar si dos páginas compiten por la misma intención. | Mantener mejoras útiles, consolidar contenido redundante y priorizar las siguientes acciones según evidencia. |

Search Console mide visibilidad y clics, no generación de QR o registros. Para conversiones se necesita una herramienta analítica propia o métricas agregadas del backend. Esta entrega **no añade rastreo**. Si se instrumenta después, eventos sugeridos: `qr_generate_success`, `qr_download` (solo formato), `signup_success`, `login_success` y `dynamic_qr_create_success`; nunca enviar correo, contraseña, token, URL de destino, nombre o nota. Una descarga debe contarse al completar la acción, no solo al pulsar un botón. Definir consentimiento y retención según el servicio elegido.

## Fuentes técnicas consultadas

- Google, canonical: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google, JavaScript SEO: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google, noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Google, sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google, SoftwareApplication: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Netlify, cabeceras: https://docs.netlify.com/manage/routing/headers/
- Netlify, parámetros y redirecciones: https://docs.netlify.com/manage/routing/redirects/redirect-options/
- Netlify, API de Edge Functions: https://docs.netlify.com/build/edge-functions/api/
- Netlify, despliegue de Edge Functions: https://docs.netlify.com/build/edge-functions/get-started/

Las decisiones de arquitectura y prioridad de palabras clave son propuestas editoriales basadas en funciones reales e intención observada; no son datos de volumen de esas fuentes.

## Títulos y descripciones exactos por URL

### https://qravj.netlify.app/

**Title:** Generador de códigos QR gratis, PNG y SVG | AVJ QR Studio

**Meta description:** Crea códigos QR de enlaces gratis y sin registro. Descarga PNG o SVG, o entra con tu cuenta para crear y administrar QR dinámicos en AVJ QR Studio.

### https://qravj.netlify.app/crear-codigo-qr/

**Title:** Crear un código QR de un enlace: paso a paso | AVJ

**Meta description:** Aprende a convertir una URL en un código QR con AVJ QR Studio, descargarlo en PNG o SVG y elegir entre un QR directo y uno dinámico.

### https://qravj.netlify.app/qr-dinamico/

**Title:** QR dinámico: cambiar el enlace sin reimprimir | AVJ

**Meta description:** Descubre cómo funciona un QR dinámico en AVJ QR Studio y cómo actualizar su destino desde tu cuenta conservando la misma imagen del código.

### https://qravj.netlify.app/descargar-qr/

**Title:** Descargar códigos QR en PNG y SVG | AVJ QR Studio

**Meta description:** Descarga tu código QR en PNG o SVG. Compara los formatos, aprende a exportar desde el generador o el panel y prepara la imagen para impresión.

### https://qravj.netlify.app/administrar-codigos-qr/

**Title:** Administrar y editar tus códigos QR | AVJ QR Studio

**Meta description:** Aprende a crear tu cuenta, buscar códigos QR, editar destinos y pausar o activar enlaces desde el panel personal de AVJ QR Studio.

### https://qravj.netlify.app/qr-para-negocios/

**Title:** Códigos QR para negocios, catálogos y promociones | AVJ

**Meta description:** Ideas para usar códigos QR en catálogos digitales, redes sociales y promociones. Elige el destino, prueba la impresión y actualiza enlaces dinámicos.

### https://qravj.netlify.app/blog/que-es-un-codigo-qr/

**Title:** Qué es un código QR y para qué sirve | AVJ QR Studio

**Meta description:** Conoce qué es un código QR, cómo lo lee un teléfono y para qué sirve al compartir enlaces de páginas web, catálogos o redes sociales.

### https://qravj.netlify.app/blog/qr-estatico-vs-dinamico/

**Title:** QR estático vs. dinámico: diferencias y usos | AVJ

**Meta description:** Compara QR estáticos y dinámicos: edición del destino, uso sin cuenta, dependencia del servicio y elección antes de imprimir un código QR.
