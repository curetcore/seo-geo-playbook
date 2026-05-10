---
name: seo-ai-geo
description: Optimiza el sitio para que ChatGPT, Claude, Perplexity, Google AI Overviews y otros buscadores generativos te citen y recomienden — protocolo llms.txt, robots.txt para AI bots (GPTBot, ClaudeBot, PerplexityBot), patrones de citabilidad y BLUF, FAQ schema para AI Overviews. Use this skill whenever the user mentions GEO, AEO, Generative Engine Optimization, Answer Engine Optimization, llms.txt, AI search, ChatGPT citations, Perplexity, AI Overviews, robots.txt for AI bots, citability, BLUF, or asks how to make their site appear in AI-generated answers — even if they don't use the exact term "GEO".
---

# AI SEO (AEO + GEO)

Cubre Answer Engine Optimization (AEO) y Generative Engine Optimization (GEO). El "corazón" del playbook — lo que más mueve la aguja en 2026. Stack: Next.js 16 App Router.

---

## Cuándo invocar este skill

- El usuario quiere aparecer citado en ChatGPT, Claude, Perplexity o Google AI Overviews
- Hay que crear `/llms.txt` o `/llms-full.txt`
- Configurar `robots.txt` para permitir/bloquear AI bots
- Agregar FAQ schema o BLUF a páginas existentes
- Auditar si el sitio aparece en respuestas de IA
- Implementar GEO/AEO desde cero

Para SEO técnico tradicional (CWV, sitemap), usar `seo-technical`. Para JSON-LD genérico (Organization, Product), usar `seo-nextjs-implementation`.

---

## Panorama 2026

| Métrica | Valor | Fuente |
|---------|-------|--------|
| ChatGPT búsquedas/semana | +1 billón | OpenAI |
| Tráfico IA a e-commerce | +1,300% (2024-2025) | Similarweb |
| Conversión desde AI search | 5.53% vs 3.7% SEO tradicional | Datos industria |
| Google AI Overviews reducen CTR | ~34.5% | SEO studies |
| Perplexity usuarios | 100M+ mensuales | Perplexity |
| Zero-click searches | 58.5% de búsquedas Google | SparkToro |

**Conclusión**: optimizar solo para Google ya no es suficiente. El contenido debe ser citable por LLMs.

---

## Reglas clave

1. **`llms.txt` debe estar bajo ~2,000 tokens** — es un resumen estructurado, no el sitio completo
2. **`/llms-full.txt` es opcional** — para LLMs que quieren contexto profundo. Sin límite de tamaño
3. **Permitir AI search bots, bloquear training-only** — GPTBot, ClaudeBot, PerplexityBot generan tráfico. CCBot, Google-Extended solo entrenan
4. **BLUF en cada sección** — la respuesta directa va en la primera oración. Los LLMs extraen el primer párrafo
5. **Cada H2 es autosuficiente** — passage-level ranking. Google y LLMs pueden citar secciones individuales
6. **NUNCA inventar `aggregateRating`** — Google penaliza fake reviews schema agresivamente

---

## Protocolo `llms.txt`

Archivo en la raíz (`/llms.txt`) que da a los LLMs un resumen estructurado del sitio. Análogo a `robots.txt` pero para dar contexto, no para restringir.

### Formato base

```
# Nombre del sitio

> Descripción breve (1-2 oraciones).

## Secciones principales

- [Nombre](URL): Descripción breve
- [Nombre](URL): Descripción breve

## Documentación

- [Docs](URL): Documentación completa
- [API](URL): Referencia de API

## Optional

- [Blog](URL): Artículos y guías
- [Changelog](URL): Historial de cambios
```

### Reglas

- **Max ~2,000 tokens** en `llms.txt` (resumen)
- `/llms-full.txt` para contenido completo (sin límite)
- Markdown válido
- Links absolutos
- Actualizar cuando cambie estructura del sitio

Implementación completa en Next.js (con Route Handler que serializa desde DB): [`references/llms-txt-template.md`](./references/llms-txt-template.md)

---

## `robots.txt` para AI bots

### Estrategia base

**Permitir** bots que generan tráfico de referencia (search bots).
**Bloquear** bots que solo hacen training sin dar tráfico.

### `robots.ts` con AI bots (resumen)

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

  return {
    rules: [
      // Crawlers tradicionales
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
      // AI Search bots (generan tráfico) — PERMITIR
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Applebot-Extended"],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      // Training-only bots — BLOQUEAR
      {
        userAgent: ["CCBot", "Google-Extended", "FacebookBot", "cohere-ai"],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

Tabla completa de AI bots con descripción y recomendación: [`references/ai-bots-table.md`](./references/ai-bots-table.md)

---

## AI Overviews Optimization

Google AI Overviews (antes SGE) muestra respuestas generadas por IA arriba de los resultados orgánicos. Para aparecer citado:

### Prerequisitos

1. **Estar en top 20** para el query (AI Overviews cita de ahí)
2. **Responder preguntas directamente** (formato Q&A)
3. **Tener E-E-A-T fuerte** (author bios, about page, fuentes)

### Tipos de queries que activan AI Overviews

| Tipo | Ejemplo | Cómo optimizar |
|------|---------|----------------|
| Informational | "qué es INP" | Definición clara en primer párrafo |
| How-to | "cómo configurar Next.js SEO" | Pasos numerados |
| Comparison | "Next.js vs Remix" | Tabla de comparación |
| Best-of | "mejores herramientas SEO 2026" | Lista con criterios |
| Local | "restaurantes cerca de mí" | LocalBusiness schema |

### FAQ Schema (formato privilegiado por AI Overviews)

```tsx
import type { FAQPage, WithContext } from "schema-dts";

interface FAQ { question: string; answer: string }

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section>
      <script type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2>Preguntas frecuentes</h2>
      {/* Renderizar accordion con faqs */}
    </section>
  );
}
```

---

## BLUF (Bottom Line Up Front)

Los LLMs extraen la primera oración o párrafo para sus respuestas. **Poner la respuesta primero**.

### Patrones por tipo de query

| Intent | Patrón BLUF | Ejemplo |
|--------|-------------|---------|
| "Qué es X" | `X es [definición]. [Contexto].` | "INP es una métrica que mide la interactividad. Reemplazó a FID en 2024." |
| "Cómo hacer X" | `Para hacer X: [pasos resumidos]. A continuación los detalles.` | "Para agregar SEO en Next.js: usa generateMetadata, JSON-LD, y sitemap.ts." |
| "Mejor X" | `El mejor X es [respuesta] porque [razón]. Alternativas: [lista].` | "El mejor framework para SEO es Next.js por su SSR nativo y metadata API." |
| "X vs Y" | `X es mejor para [caso], Y es mejor para [caso]. [Tabla].` | "Next.js es mejor para apps dinámicas, Astro para sitios de contenido." |
| "Cuánto cuesta X" | `X cuesta [rango]. [Factores que afectan precio].` | "Un SaaS básico cuesta $29-99/mes. Depende de features y usuarios." |

Más patrones de citabilidad (definiciones claras, listas con estructura, stats con fuentes, pasos numerados): [`references/citability-patterns.md`](./references/citability-patterns.md)

---

## Checklist GEO completo

### Infraestructura
- [ ] `/llms.txt` creado y accesible (< 2,000 tokens)
- [ ] `/llms-full.txt` con contenido expandido
- [ ] `robots.txt` permite GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot
- [ ] `robots.txt` bloquea CCBot, Google-Extended, FacebookBot
- [ ] Sitemap actualizado y enviado a GSC

### Schema (JSON-LD)
- [ ] Organization schema en home
- [ ] Product schema con `aggregateRating` (solo si tenés reviews reales)
- [ ] FAQPage schema en páginas con preguntas
- [ ] BreadcrumbList en todas las páginas internas
- [ ] HowTo schema en guías paso a paso
- [ ] Article/BlogPosting schema en posts

### Contenido
- [ ] BLUF: respuesta en primer párrafo de cada sección
- [ ] Definiciones claras para conceptos clave
- [ ] Tablas de comparación donde aplique
- [ ] Listas numeradas para procesos/rankings
- [ ] Stats con fuentes citables
- [ ] Cada H2 es autosuficiente (passage-level ranking)

### E-E-A-T
- [ ] Author bios en blog posts
- [ ] About page con historia de la empresa
- [ ] Testimonios/reviews con nombre real
- [ ] Links a fuentes autoritativas
- [ ] Fecha de publicación y actualización visible

### Verificación
- [ ] Preguntar a ChatGPT sobre tu producto/servicio
- [ ] Preguntar a Perplexity sobre tu nicho
- [ ] `curl https://tudominio.com/llms.txt` funciona
- [ ] `curl https://tudominio.com/robots.txt` muestra reglas de bots IA
- [ ] GSC muestra AI Overviews en performance (filtro)

---

## Verificación

| Qué verificar | Herramienta | Frecuencia |
|---------------|-------------|------------|
| Citaciones en ChatGPT | Preguntar sobre tu nicho | Mensual |
| Citaciones en Perplexity | Preguntar sobre tu producto | Mensual |
| `llms.txt` accesible | `curl /llms.txt` | Post-deploy |
| `robots.txt` correcto | `curl /robots.txt` | Post-deploy |
| AI Overviews | GSC Performance (filtro AI) | Semanal |
| Schema válido | Rich Results Test | Post-cambio |
| E-E-A-T signals | Manual review | Trimestral |

---

## Referencias técnicas profundas

- [`references/llms-txt-template.md`](./references/llms-txt-template.md) — Implementación Next.js completa de `/llms.txt` y `/llms-full.txt` con Route Handler que serializa desde DB
- [`references/ai-bots-table.md`](./references/ai-bots-table.md) — Tabla completa de AI bots conocidos con empresa, propósito y recomendación (permitir/bloquear/evaluar)
- [`references/citability-patterns.md`](./references/citability-patterns.md) — 5 patrones concretos para escribir contenido que los LLMs citan (definiciones, listas, tablas, stats con fuentes, pasos numerados)
