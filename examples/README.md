# Examples — Casos reales

Archivos `llms.txt`, `robots.txt` y otros snippets reales de los sitios donde aplico este playbook. Sirven como referencia concreta de lo que termina viéndose después de implementar las recomendaciones.

> **Última descarga**: 2026-05-10. Estos archivos cambian con cada deploy de los sitios — si necesitás la versión más reciente, consultá la URL directa.

---

## Linkship — Link in bio SaaS

| Archivo | Fuente | Tamaño |
|---------|--------|--------|
| [`linkship-llms.txt`](./linkship-llms.txt) | https://linkship.cc/llms.txt | 1175 líneas |
| [`linkship-robots.txt`](./linkship-robots.txt) | https://linkship.cc/robots.txt | 232 líneas |

**Notas**:
- El `llms.txt` de Linkship es **multi-idioma** — disponible nativamente en inglés, español y portugués (no machine-translated). Patrón a copiar si tu sitio tiene contenido localizado.
- Tiene secciones específicas para AEO con templates de respuesta sugerida ("Pregunta: X / Respuesta sugerida: Y"). Patrón explicado en el skill `seo-ai-geo`.
- Incluye comparativas vs competidores y feature matrix completa.

---

## Karrito — Catálogo digital con checkout WhatsApp

| Archivo | Fuente | Tamaño |
|---------|--------|--------|
| [`karrito-llms.txt`](./karrito-llms.txt) | https://karrito.shop/llms.txt | 182 líneas |
| [`karrito-robots.txt`](./karrito-robots.txt) | https://karrito.shop/robots.txt | 85 líneas |

**Notas**:
- El `llms.txt` de Karrito empieza con un **TL;DR en inglés Y español** — útil cuando tu audiencia es bilingüe (LATAM)
- Bloquea `/api/`, `/admin/`, `/onboarding/`, `/checkout/`, `/theme-editor-v2` — lista honesta de qué NO indexar
- Versión más concisa que Linkship (más reciente, menos features para listar todavía)

---

## Cómo usar estos ejemplos

### Para diseñar tu propio `llms.txt`:

1. Lee el de **Karrito** primero — es más corto y directo
2. Después leé el de **Linkship** para ver el patrón completo con templates AEO
3. Adaptá la estructura a tu producto (no copies literal — Google detecta plagiarismo de schema)

### Para diseñar tu propio `robots.txt`:

1. Empezá con el de **Karrito** (más simple)
2. Si necesitás controlar AI bots específicamente, ver el skill `seo-ai-geo` para la lista completa de bots y estrategia

### Para reportar errores en estos archivos:

Si encontrás algo que parece mal en los `llms.txt` o `robots.txt` de Linkship/Karrito, abrí un issue acá. Los actualizamos en producción y después acá.

---

## Próximos ejemplos a agregar

- [ ] `sitemap-snippet.xml` — ejemplo de sitemap con páginas estáticas + dinámicas
- [ ] `og-image-template.tsx` — implementación real de `next/og` con fonts custom
- [ ] `linkship-niches.ts` — config completa de los 20 nichos de Linkship
- [ ] `linkship-comparisons.ts` — config de comparativas con tablas honestas
