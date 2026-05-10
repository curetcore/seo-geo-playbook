/**
 * @fileoverview Enterprise SEO Utilities for LectorAI
 *
 * This module provides comprehensive SEO utilities including:
 * - Metadata generation for Open Graph and Twitter Cards
 * - JSON-LD structured data generators (Schema.org)
 * - Canonical URL management
 * - SEO constants and configurations
 *
 * @see https://schema.org/ for JSON-LD schemas
 * @see https://ogp.me/ for Open Graph protocol
 */

import { Metadata } from "next";
import { createElement } from "react";

// =============================================================================
// CONSTANTS
// =============================================================================

export const SEO_CONFIG = {
  siteName: "LectorAI",
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://lectorai.com",
  defaultTitle: "LectorAI - Traductor de Libros con IA",
  defaultDescription:
    "Traduce libros de inglés a español con inteligencia artificial avanzada. Soporta EPUB, PDF y más formatos. Powered by GPT-4, Claude y Gemini.",
  defaultImage: "/og-image.png",
  twitterHandle: "@lectorai",
  locale: "es_ES",
  themeColor: "#6366f1",
  keywords: [
    "traductor de libros",
    "traducción con IA",
    "traducir EPUB",
    "traducir PDF",
    "GPT-4 traductor",
    "Claude traductor",
    "libros en español",
    "traducción automática",
    "inteligencia artificial",
    "LectorAI",
  ],
} as const;

// =============================================================================
// TYPES
// =============================================================================

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

export interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  publisherName?: string;
  publisherLogo?: string;
  section?: string;
  tags?: string[];
}

export interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  sameAs?: string[];
}

export interface WebsiteJsonLdProps {
  name?: string;
  url?: string;
  description?: string;
  searchUrl?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductJsonLdProps {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability?: string;
  }[];
}

// =============================================================================
// METADATA GENERATORS
// =============================================================================

/**
 * Generates comprehensive Next.js Metadata object for SEO
 */
export function generateMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  noindex = false,
  canonical,
}: SEOProps = {}): Metadata {
  const finalTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;
  const finalDescription = description || SEO_CONFIG.defaultDescription;
  const finalImage = image || SEO_CONFIG.defaultImage;
  const finalUrl = url || SEO_CONFIG.siteUrl;
  const absoluteImage = finalImage.startsWith("http")
    ? finalImage
    : `${SEO_CONFIG.siteUrl}${finalImage}`;

  const metadata: Metadata = {
    title: finalTitle,
    description: finalDescription,
    keywords: tags?.length ? tags : [...SEO_CONFIG.keywords],
    authors: author ? [{ name: author }] : undefined,
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: canonical || finalUrl,
    },
    openGraph: {
      type: type === "article" ? "article" : "website",
      locale: SEO_CONFIG.locale,
      url: finalUrl,
      siteName: SEO_CONFIG.siteName,
      title: title || SEO_CONFIG.defaultTitle,
      description: finalDescription,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title || SEO_CONFIG.siteName,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterHandle,
      creator: SEO_CONFIG.twitterHandle,
      title: title || SEO_CONFIG.defaultTitle,
      description: finalDescription,
      images: [absoluteImage],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    other: {
      "theme-color": SEO_CONFIG.themeColor,
    },
  };

  return metadata;
}

// =============================================================================
// JSON-LD GENERATORS
// =============================================================================

/**
 * Generates Organization JSON-LD schema
 */
export function generateOrganizationJsonLd({
  name = SEO_CONFIG.siteName,
  url = SEO_CONFIG.siteUrl,
  logo = `${SEO_CONFIG.siteUrl}/logo.png`,
  description = SEO_CONFIG.defaultDescription,
  email = "soporte@lectorai.com",
  sameAs = [],
}: OrganizationJsonLdProps = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    description,
    email,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email,
      availableLanguage: ["Spanish", "English"],
    },
  };
}

/**
 * Generates Website JSON-LD schema with search action
 */
export function generateWebsiteJsonLd({
  name = SEO_CONFIG.siteName,
  url = SEO_CONFIG.siteUrl,
  description = SEO_CONFIG.defaultDescription,
  searchUrl,
}: WebsiteJsonLdProps = {}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    inLanguage: "es",
    publisher: {
      "@type": "Organization",
      name,
      url,
    },
  };

  if (searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchUrl,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

/**
 * Blog post object for JSON-LD generation
 */
interface BlogPostObject {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
  author: {
    id: string;
    name?: string | null;
    image?: string | null;
  };
  category?: {
    name: string;
    slug: string;
  } | null;
  tags?: {
    name: string;
    slug: string;
  }[];
}

/**
 * Generates Article JSON-LD schema for blog posts
 * Accepts either explicit props or a blog post object
 */
export function generateArticleJsonLd(
  propsOrPost: ArticleJsonLdProps | BlogPostObject
): Record<string, unknown> {
  // Check if it's a BlogPostObject by looking for slug property
  if ("slug" in propsOrPost && "content" in propsOrPost) {
    const post = propsOrPost as BlogPostObject;
    const baseUrl = SEO_CONFIG.siteUrl;
    const postUrl = `${baseUrl}/comunidad/${post.slug}`;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      url: postUrl,
      image: post.coverImage || `${baseUrl}${SEO_CONFIG.defaultImage}`,
      datePublished: post.publishedAt?.toISOString() || new Date().toISOString(),
      dateModified: post.updatedAt?.toISOString() || post.publishedAt?.toISOString() || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: post.author.name || "LectorAI User",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: SEO_CONFIG.siteName,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      articleSection: post.category?.name,
      keywords: post.tags?.map((t) => t.name).join(", "),
      inLanguage: "es",
    };
  }

  // Original props-based implementation
  const props = propsOrPost as ArticleJsonLdProps;
  const {
    title,
    description,
    url,
    image,
    datePublished,
    dateModified,
    authorName,
    authorUrl,
    publisherName = SEO_CONFIG.siteName,
    publisherLogo = `${SEO_CONFIG.siteUrl}/logo.png`,
    section,
    tags,
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl || SEO_CONFIG.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: section,
    keywords: tags?.join(", "),
    inLanguage: "es",
  };
}

/**
 * Generates BlogPosting JSON-LD schema (more specific than Article)
 */
export function generateBlogPostingJsonLd(props: ArticleJsonLdProps) {
  const article = generateArticleJsonLd(props);
  return {
    ...article,
    "@type": "BlogPosting",
  };
}

/**
 * Generates BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates FAQ JSON-LD schema
 */
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

/**
 * Generates SoftwareApplication JSON-LD schema
 */
export function generateSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.siteUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "19.99",
      priceCurrency: "USD",
      offerCount: 3,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Traducción de libros EPUB",
      "Traducción de libros PDF",
      "Múltiples modelos de IA (GPT-4, Claude, Gemini)",
      "Preservación de formato",
      "API REST para desarrolladores",
    ],
  };
}

/**
 * Generates Product JSON-LD for pricing plans
 */
export function generateProductJsonLd({
  name,
  description,
  image,
  brand = SEO_CONFIG.siteName,
  offers,
}: ProductJsonLdProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: offers?.map((offer) => ({
      "@type": "Offer",
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      availability: offer.availability || "https://schema.org/InStock",
    })),
  };
}

/**
 * Book JSON-LD props
 */
export interface BookJsonLdProps {
  name: string;
  author?: string;
  description?: string;
  image?: string;
  url: string;
  inLanguage?: string;
  numberOfPages?: number;
  datePublished?: string;
}

/**
 * Generates Book JSON-LD schema for book pages
 */
export function generateBookJsonLd({
  name,
  author,
  description,
  image,
  url,
  inLanguage = "es",
  numberOfPages,
  datePublished,
}: BookJsonLdProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name,
    author: author ? {
      "@type": "Person",
      name: author,
    } : undefined,
    description: description || `${name} traducido con inteligencia artificial en LectorAI`,
    image: image || `${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultImage}`,
    url,
    inLanguage,
    numberOfPages,
    datePublished,
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
  };
}

/**
 * Generates BlogList JSON-LD for blog/community index
 */
export function generateBlogListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SEO_CONFIG.siteName} Comunidad`,
    description: "Artículos, tutoriales y noticias sobre traducción de libros con IA",
    url: `${SEO_CONFIG.siteUrl}/comunidad`,
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    inLanguage: "es",
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Creates absolute URL from relative path
 */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SEO_CONFIG.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Truncates text for meta descriptions (max 160 chars)
 */
export function truncateDescription(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + "...";
}

/**
 * Generates slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generates canonical URL for a page
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.split("?")[0].split("#")[0];
  return absoluteUrl(cleanPath);
}

// =============================================================================
// REACT COMPONENTS
// =============================================================================

/**
 * JSON-LD script component for structured data
 * Usage: <JsonLd data={generateArticleJsonLd(...)} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}

// =============================================================================
// LEGACY/COMPATIBILITY EXPORTS
// =============================================================================

/**
 * @deprecated Use generateMetadata instead
 * Generates Open Graph metadata object
 */
export function generateOpenGraphMetadata(props: SEOProps = {}) {
  const metadata = generateMetadata(props);
  return metadata.openGraph;
}

/**
 * @deprecated Use generateMetadata instead
 * Generates Twitter Card metadata object
 */
export function generateTwitterMetadata(props: SEOProps = {}) {
  const metadata = generateMetadata(props);
  return metadata.twitter;
}
