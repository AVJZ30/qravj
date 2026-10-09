# AVJ QR Studio — proyecto SEO listo para desplegar

La aplicación está en `public/`. Las instrucciones completas, las ocho URLs, sus palabras clave, todos los títulos/descripciones, variantes de CTR y plan a 30/60/90 días están en `docs/INFORME_SEO.md`.

## Publicar

Utiliza el sitio Netlify existente, con la carpeta que contiene `netlify.toml` como base y `public` como directorio de publicación. No hace falta compilar el HTML. Despliega por Git o Netlify CLI para incluir `netlify/edge-functions/qr-indexing.js`.

No subas únicamente `public` mediante arrastrar y soltar si necesitas la exclusión HTTP de los enlaces `?q=`. No cambies `config.js` ni el dominio de los códigos existentes.

## Pruebas reproducibles

Desde esta carpeta:

```sh
python3 tests/validate.py
node tests/edge.mjs
node tests/seo-state.cjs
```

Para navegador: instala Playwright en un entorno de pruebas (`npm install --no-save playwright` y `npx playwright install chromium`), sirve `public` en el puerto 8765 (`python3 -m http.server 8765 --directory public`) y ejecuta en otra terminal `node tests/browser.cjs`.

La prueba de navegador sustituye Supabase por una simulación. No prueba la base de datos real, las políticas RLS o la entrega de correos. La variable opcional `CHROMIUM_EXECUTABLE` permite indicar otro ejecutable de Chromium. Consulta `docs/PRUEBAS.md` para saber qué se ejecutó en esta entrega.

Los archivos de documentación y pruebas quedan fuera de `public` para no publicarlos como páginas del sitio.
