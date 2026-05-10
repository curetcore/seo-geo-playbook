---
name: seo
description: SEO enterprise para Next.js. Rich snippets, JSON-LD (Organization, Product, FAQ, HowTo), meta tags dinamicos, sitemap, robots.txt, y optimizacion para buscadores de IA (AEO/GEO).
---

# SEO Enterprise Skill

Sistema completo de SEO para proyectos Next.js con rich snippets, JSON-LD y optimización para buscadores de IA.

## Resultado Esperado en Google

```
Tu App - Descripción...
tuapp.com
⭐⭐⭐⭐⭐ 4.9 (127 reseñas) · desde $0
Descripción de tu producto...
```

## Archivos a Crear

### 1. `src/lib/seo.ts` - Utilidades SEO

```typescript
import { Metadata } from "next";
import { createElement } from "react";

// =============================================================================
// CONFIGURACIÓN - EDITAR PARA CADA PROYECTO
// =============================================================================

export const SEO_CONFIG = {
  siteName: "TuApp",
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://tuapp.com",
  defaultTitle: "TuApp - Tu Descripción Corta",
  defaultDescription: "Descripción de 150-160 caracteres que aparece en Google.",
  defaultImage: "/og-image.png",
  twitterHandle: "@tuapp",
  locale: "es_ES",
  themeColor: "#6366f1",
  keywords: ["keyword1", "keyword2", "keyword3"],
} as const;

// =============================================================================
// TIPOS
// =============================================================================

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// =============================================================================
// GENERADOR DE METADATA (Next.js)
// =============================================================================

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  noindex = false,
}: SEOProps = {}): Metadata {
  const finalTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;
  const finalDescription = description || SEO_CONFIG.defaultDescription;
  const finalImage = image || SEO_CONFIG.defaultImage;
  const absoluteImage = finalImage.startsWith("http")
    ? finalImage
    : `${SEO_CONFIG.siteUrl}${finalImage}`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: SEO_CONFIG.keywords,
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    openGraph: {
      type: type === "article" ? "article" : "website",
      locale: SEO_CONFIG.locale,
      url: url || SEO_CONFIG.siteUrl,
      siteName: SEO_CONFIG.siteName,
      title: finalTitle,
      description: finalDescription,
      images: [{ url: absoluteImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      title: finalTitle,
      description: finalDescription,
      images: [absoluteImage],
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

// =============================================================================
// JSON-LD GENERATORS
// =============================================================================

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}

export function generateFAQJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateOrganizationJsonLd(props: {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: props.name || SEO_CONFIG.siteName,
    url: props.url || SEO_CONFIG.siteUrl,
    logo: props.logo || `${SEO_CONFIG.siteUrl}/logo.png`,
    description: props.description || SEO_CONFIG.defaultDescription,
    sameAs: props.sameAs || [],
  };
}

export function generateWebsiteJsonLd(props: {
  name?: string;
  url?: string;
  description?: string;
} = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: props.name || SEO_CONFIG.siteName,
    url: props.url || SEO_CONFIG.siteUrl,
    description: props.description || SEO_CONFIG.defaultDescription,
    inLanguage: "es",
  };
}
```

### 2. `src/components/seo/homepage-seo.tsx` - Componente Homepage

```tsx
import { JsonLd, generateFAQJsonLd, generateOrganizationJsonLd, generateWebsiteJsonLd, SEO_CONFIG } from "@/lib/seo";

// =============================================================================
// CONFIGURACIÓN DEL PRODUCTO - EDITAR PARA CADA PROYECTO
// =============================================================================

const PRODUCT_CONFIG = {
  // Info básica
  name: "TuApp",
  description: "Descripción de tu producto para SEO",
  category: "UtilitiesApplication", // BusinessApplication, GameApplication, etc.

  // Rating (ajustar según reseñas reales)
  rating: "4.9",
  ratingCount: "127",

  // Planes de precio
  offers: [
    { name: "Gratis", price: "0", description: "Plan básico" },
    { name: "Pro", price: "24", description: "Plan completo" },
  ],

  // Features principales
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3",
  ],

  // Redes sociales
  socialLinks: [
    "https://twitter.com/tucuenta",
    "https://www.instagram.com/tucuenta",
  ],
};

// FAQs para rich snippets
const FAQS = [
  {
    question: "¿Pregunta frecuente 1?",
    answer: "Respuesta completa a la pregunta 1.",
  },
  {
    question: "¿Pregunta frecuente 2?",
    answer: "Respuesta completa a la pregunta 2.",
  },
];

// =============================================================================
// COMPONENTES JSON-LD
// =============================================================================

function SoftwareApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: PRODUCT_CONFIG.name,
    description: PRODUCT_CONFIG.description,
    url: SEO_CONFIG.siteUrl,
    applicationCategory: PRODUCT_CONFIG.category,
    operatingSystem: "Web",
    offers: PRODUCT_CONFIG.offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: offer.description,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: PRODUCT_CONFIG.rating,
      ratingCount: PRODUCT_CONFIG.ratingCount,
      bestRating: "5",
      worstRating: "1",
    },
    featureList: PRODUCT_CONFIG.features,
    author: {
      "@type": "Organization",
      name: PRODUCT_CONFIG.name,
      url: SEO_CONFIG.siteUrl,
    },
  };

  return <JsonLd data={data} />;
}

function OrganizationJsonLd() {
  return (
    <JsonLd
      data={generateOrganizationJsonLd({
        name: PRODUCT_CONFIG.name,
        sameAs: PRODUCT_CONFIG.socialLinks,
      })}
    />
  );
}

function WebsiteJsonLd() {
  return <JsonLd data={generateWebsiteJsonLd()} />;
}

function FAQJsonLd() {
  return <JsonLd data={generateFAQJsonLd(FAQS)} />;
}

// =============================================================================
// COMPONENTE PRINCIPAL - USAR EN PAGE.TSX
// =============================================================================

export function HomepageSEO() {
  return (
    <>
      <SoftwareApplicationJsonLd />
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <FAQJsonLd />
    </>
  );
}
```

### 3. Uso en `src/app/page.tsx`

```tsx
import { HomepageSEO } from "@/components/seo/homepage-seo";

export const metadata = {
  title: "TuApp - Descripción corta",
  description: "Descripción de 150-160 caracteres.",
};

export default function HomePage() {
  return (
    <>
      <HomepageSEO />
      {/* Resto de tu página */}
    </>
  );
}
```

## Tipos de JSON-LD por Tipo de Proyecto

| Tipo de Proyecto | Schema Principal | Extras |
|------------------|------------------|--------|
| SaaS/App Web | SoftwareApplication | Organization, FAQ |
| E-commerce | Product, ItemList | BreadcrumbList |
| Blog | Article, BlogPosting | Person (autor) |
| Negocio Local | LocalBusiness | OpeningHours, Address |
| Curso/Educación | Course | Instructor, Provider |
| Evento | Event | Location, Performer |

## Verificar Rich Snippets

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Validator**: https://validator.schema.org/

## Tiempo de Indexación

- Google tarda **2-4 semanas** en mostrar rich snippets
- Puedes solicitar indexación en Google Search Console

## Checklist de Implementación

- [ ] Crear `src/lib/seo.ts` con configuración
- [ ] Crear `src/components/seo/homepage-seo.tsx`
- [ ] Editar `SEO_CONFIG` con datos del proyecto
- [ ] Editar `PRODUCT_CONFIG` con info del producto
- [ ] Agregar FAQs relevantes (mínimo 3)
- [ ] Incluir `<HomepageSEO />` en página principal
- [ ] Verificar con Rich Results Test
- [ ] Solicitar indexación en Search Console
