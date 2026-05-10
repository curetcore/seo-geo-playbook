# AI SEO (AEO + GEO)

> Skill del agente `seo-marketing`. Cubre Answer Engine Optimization (AEO) y Generative Engine Optimization (GEO).
> Incluye llms.txt, robots.txt para bots IA, AI Overviews, y patrones de citabilidad.
> Stack: Next.js 16 App Router, React 19 RSC.

---

## Panorama 2026

| Metrica | Valor | Fuente |
|---------|-------|--------|
| ChatGPT busquedas/semana | +1 billon | OpenAI |
| Trafico IA a e-commerce | +1,300% (2024-2025) | Similarweb |
| Conversion desde AI search | 5.53% vs 3.7% SEO tradicional | Datos industria |
| Google AI Overviews reducen CTR | ~34.5% | SEO studies |
| Perplexity usuarios | 100M+ mensuales | Perplexity |
| Zero-click searches | 58.5% de busquedas Google | SparkToro |

**Conclusion**: Optimizar solo para Google ya no es suficiente. El contenido debe ser citeable por LLMs.

---

## Protocolo llms.txt

### Que es

Archivo en la raiz del sitio (`/llms.txt`) que proporciona a los LLMs un resumen estructurado del sitio. Analogo a robots.txt pero para dar contexto, no para restringir.

### Formato

```
# Nombre del Sitio

> Descripcion breve del sitio (1-2 oraciones).

## Secciones Principales

- [Nombre](URL): Descripcion breve
- [Nombre](URL): Descripcion breve

## Documentacion

- [Docs](URL): Documentacion completa
- [API](URL): Referencia de API

## Optional

- [Blog](URL): Articulos y guias
- [Changelog](URL): Historial de cambios
```

### Reglas

- **Max ~2,000 tokens** en llms.txt (resumen)
- `/llms-full.txt` para contenido completo (sin limite)
- Markdown valido
- Links absolutos
- Actualizar cuando cambie estructura del sitio

### Implementacion Next.js

```ts
// app/llms.txt/route.ts
export async function GET() {
  const content = `# Brand Name

> Descripcion del sitio en 1-2 oraciones. Que hace, para quien.

## Producto

- [Features](/features): Descripcion de funcionalidades principales
- [Pricing](/precios): Planes y precios disponibles
- [Demo](/demo): Demo interactiva del producto

## Recursos

- [Blog](/blog): Articulos sobre [tema del sitio]
- [Docs](/docs): Documentacion tecnica completa
- [API Reference](/docs/api): Referencia de API REST

## Empresa

- [About](/about): Historia y mision
- [Contact](/contacto): Formulario de contacto
- [Careers](/careers): Posiciones abiertas

## Links Importantes

- [Changelog](/changelog): Historial de actualizaciones
- [Status](https://status.brand.com): Estado del servicio
- [Terms](/legal/terms): Terminos de servicio
- [Privacy](/legal/privacy): Politica de privacidad
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400", // 24h cache
    },
  });
}
```

```ts
// app/llms-full.txt/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Contenido completo para LLMs que quieren contexto profundo
  const products = await prisma.product.findMany({
    where: { published: true },
    select: { name: true, slug: true, description: true, price: true },
    take: 100,
  });

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { title: true, slug: true, excerpt: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  let content = `# Brand Name - Contenido Completo\n\n`;
  content += `> [Sitio web](https://brand.com) | [llms.txt corto](/llms.txt)\n\n`;

  content += `## Productos\n\n`;
  for (const p of products) {
    content += `### ${p.name}\n`;
    content += `- URL: /productos/${p.slug}\n`;
    content += `- Precio: $${p.price}\n`;
    content += `- ${p.description ?? ""}\n\n`;
  }

  content += `## Blog\n\n`;
  for (const post of posts) {
    content += `- [${post.title}](/blog/${post.slug}): ${post.excerpt ?? ""}\n`;
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
```

---

## robots.txt para AI Bots

### Tabla de bots conocidos (2026)

| Bot | Empresa | Proposito | Recomendacion |
|-----|---------|-----------|---------------|
| `GPTBot` | OpenAI | Training + search | Permitir |
| `OAI-SearchBot` | OpenAI | ChatGPT search | Permitir |
| `ChatGPT-User` | OpenAI | Browsing mode | Permitir |
| `ClaudeBot` | Anthropic | Training + search | Permitir |
| `PerplexityBot` | Perplexity | Search | Permitir |
| `Applebot-Extended` | Apple | Apple Intelligence | Permitir |
| `Bytespider` | ByteDance | Training | Evaluar |
| `CCBot` | Common Crawl | Training datasets | Bloquear |
| `Google-Extended` | Google | Gemini training | Bloquear |
| `FacebookBot` | Meta | AI training | Bloquear |
| `Amazonbot` | Amazon | Alexa/training | Evaluar |
| `anthropic-ai` | Anthropic | Training crawler | Evaluar |
| `cohere-ai` | Cohere | Training | Bloquear |

### Estrategia

**Permitir** bots que generan trafico de referencia (search bots).
**Bloquear** bots que solo hacen training sin dar trafico.

### robots.ts completo

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
        disallow: ["/api/", "/admin/", "/_next/", "/private/", "/dashboard/"],
      },
      // AI Search bots (generan trafico) - PERMITIR
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot-Extended",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      // Training-only bots - BLOQUEAR
      {
        userAgent: ["CCBot", "Google-Extended", "FacebookBot", "cohere-ai"],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## AI Overviews Optimization

Google AI Overviews (antes SGE) muestra respuestas generadas por IA arriba de los resultados organicos. Para aparecer citado:

### Prerequisitos

1. **Estar en top 20** para el query (AI Overviews cita de ahi)
2. **Responder preguntas directamente** (formato Q&A)
3. **Tener E-E-A-T fuerte** (author bios, about page, fuentes)

### Tipos de queries que activan AI Overviews

| Tipo | Ejemplo | Como optimizar |
|------|---------|----------------|
| Informational | "que es INP" | Definicion clara en primer parrafo |
| How-to | "como configurar Next.js SEO" | Pasos numerados |
| Comparison | "Next.js vs Remix" | Tabla de comparacion |
| Best-of | "mejores herramientas SEO 2026" | Lista con criterios |
| Local | "restaurantes cerca de mi" | LocalBusiness schema |

### FAQ Schema para AI Overviews

```tsx
// components/faq-section.tsx
import type { FAQPage, WithContext } from "schema-dts";

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2>Preguntas frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="cursor-pointer font-medium">
              {faq.question}
            </summary>
            <p className="mt-2 text-base-content/70">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

---

## Patrones de Citabilidad

Los LLMs citan contenido que es facil de extraer y verificar. Estos patrones aumentan la probabilidad de ser citado:

### 1. Definiciones claras

```markdown
**INP (Interaction to Next Paint)** es una metrica de Core Web Vitals que mide
la latencia de la interaccion mas lenta del usuario durante la sesion.
Un buen INP es menor a 200ms.
```

### 2. Listas con estructura

```markdown
Los 3 Core Web Vitals en 2026 son:
1. **LCP** (Largest Contentful Paint) - velocidad de carga, meta < 2.5s
2. **INP** (Interaction to Next Paint) - interactividad, meta < 200ms
3. **CLS** (Cumulative Layout Shift) - estabilidad visual, meta < 0.1
```

### 3. Tablas de comparacion

```markdown
| Feature | Next.js | Remix | Astro |
|---------|---------|-------|-------|
| SSR | Si | Si | Si |
| RSC | Si | No | No |
| Edge Runtime | Si | Si | Si |
```

### 4. Stats con fuentes

```markdown
Segun [SparkToro 2026], el 58.5% de las busquedas en Google
resultan en zero-click, lo que significa que los usuarios obtienen
su respuesta sin visitar ningun sitio.
```

### 5. Pasos numerados

```markdown
## Como configurar llms.txt en Next.js

1. Crear `app/llms.txt/route.ts`
2. Exportar funcion GET que retorne el contenido
3. Formato: titulo H1, descripcion, secciones con links
4. Mantener bajo 2,000 tokens
5. Actualizar cuando cambie la estructura del sitio
```

---

## BLUF para AI (Bottom Line Up Front)

Los LLMs extraen la primera oracion/parrafo para respuestas. Poner la respuesta primero.

### Patrones por tipo de query

| Intent | Patron BLUF | Ejemplo |
|--------|-------------|---------|
| "Que es X" | `X es [definicion]. [Contexto].` | "INP es una metrica que mide la interactividad. Reemplazo a FID en 2024." |
| "Como hacer X" | `Para hacer X: [pasos resumidos]. A continuacion los detalles.` | "Para agregar SEO en Next.js: usa generateMetadata, JSON-LD, y sitemap.ts." |
| "Mejor X" | `El mejor X es [respuesta] porque [razon]. Alternativas: [lista].` | "El mejor framework para SEO es Next.js por su SSR nativo y metadata API." |
| "X vs Y" | `X es mejor para [caso], Y es mejor para [caso]. [Tabla].` | "Next.js es mejor para apps dinamicas, Astro para sitios de contenido." |
| "Cuanto cuesta X" | `X cuesta [rango]. [Factores que afectan precio].` | "Un SaaS basico cuesta $29-99/mes. El precio depende de features y usuarios." |

---

## GEO Checklist Completo

### Infraestructura

- [ ] `/llms.txt` creado y accesible (< 2,000 tokens)
- [ ] `/llms-full.txt` con contenido expandido
- [ ] `robots.txt` permite GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot
- [ ] `robots.txt` bloquea CCBot, Google-Extended, FacebookBot
- [ ] Sitemap actualizado y enviado a GSC

### Schema (JSON-LD)

- [ ] Organization schema en home
- [ ] Product schema con aggregateRating en productos
- [ ] FAQPage schema en paginas con preguntas
- [ ] BreadcrumbList en todas las paginas internas
- [ ] HowTo schema en guias paso a paso
- [ ] Article/BlogPosting schema en posts

### Contenido

- [ ] BLUF: respuesta en primer parrafo de cada seccion
- [ ] Definiciones claras para conceptos clave
- [ ] Tablas de comparacion donde aplique
- [ ] Listas numeradas para procesos/rankings
- [ ] Stats con fuentes citables
- [ ] Cada H2 es auto-contenido (passage-level ranking)

### E-E-A-T

- [ ] Author bios en blog posts
- [ ] About page con historia de la empresa
- [ ] Testimonials/reviews con nombre real
- [ ] Links a fuentes autoritativas
- [ ] Fecha de publicacion y actualizacion visible

### Verificacion

- [ ] Preguntar a ChatGPT sobre tu producto/servicio
- [ ] Preguntar a Perplexity sobre tu nicho
- [ ] `curl https://tudominio.com/llms.txt` funciona
- [ ] `curl https://tudominio.com/robots.txt` muestra reglas de bots IA
- [ ] GSC muestra AI Overviews en performance (filtro)

---

## Verificacion

| Que verificar | Herramienta | Frecuencia |
|---------------|-------------|------------|
| Citaciones en ChatGPT | Preguntar sobre tu nicho | Mensual |
| Citaciones en Perplexity | Preguntar sobre tu producto | Mensual |
| llms.txt accesible | `curl /llms.txt` | Post-deploy |
| robots.txt correcto | `curl /robots.txt` | Post-deploy |
| AI Overviews | GSC Performance (filtro AI) | Semanal |
| Schema valido | Rich Results Test | Post-cambio |
| E-E-A-T signals | Manual review | Trimestral |
