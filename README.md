# BlogItMD

Plataforma ligera para publicar artículos en Markdown desde un formulario web. Al subir un .md, se genera automáticamente una ruta accesible desde /blog. Ideal para blogs personales o despliegues rápidos de contenido escrito.

## 🔐 Seguridad y sesión

Este proyecto usa `express-session` con `MemoryStore`, adecuado solo para pruebas o desarrollo.

Para producción, recomendamos:

- Usar `connect-redis`, `connect-mongo` o similares
- Activar `secure: true` y usar HTTPS
- Configurar un `SESSION_SECRET` en `.env`

Consulta la [documentación oficial de express-session](https://github.com/expressjs/session) para más detalles.
