/**
 * @fileoverview Enterprise SEO utilities for Next.js (App Router).
 *
 * Drop-in module that provides:
 * - Type-safe Next.js Metadata generation (Open Graph + Twitter Cards)
 * - JSON-LD generators (Organization, Website, Article, BlogPosting,
 *   BreadcrumbList, FAQ, SoftwareApplication, Product)
 * - Canonical URL helpers
 *
 * Configuration is env-driven. Set `NEXT_PUBLIC_SITE_*` variables
 * (see `SEO_CONFIG`) or override per-call.
 *
 * @see https://schema.org/ for JSON-LD schemas
 * @see https://ogp.me/ for the Open Graph protocol
 */

import { Metadata } from "next";
import { createElement } from "react";

// =============================================================================
// CONFIG — override via env vars or edit defaults
// =============================================================================

export const SEO_CONFIG = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Brand",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  defaultTitle:
    process.env.NEXT_PUBLIC_SITE_TITLE || "Brand — short tagline",
  defaultDescription:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Replace this with a 150–160 character description that summarizes the site's value.",
  defaultImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || "/og-image.png",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@yourhandle",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  locale: process.env.NEXT_PUBLIC_LOCALE || "es_ES",
  themeColor: process.env.NEXT_PUBLIC_THEME_COLOR || "#6366f1",
  // Edit this list with your real keywords. Keep it tight (5–10 max).
  keywords: [
    "keyword 1",
    "keyword 2",
    "keyword 3",
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
// METADATA GENERATOR
// =============================================================================

/**
 * Generates a comprehensive Next.js Metadata object for SEO.
 *
 * Use in `generateMetadata()` exports of route segments. Static layouts
 * can pass an empty argument to inherit defaults from `SEO_CONFIG`.
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
 * Generates an Organization JSON-LD schema.
 */
export function generateOrganizationJsonLd({
  name = SEO_CONFIG.siteName,
  url = SEO_CONFIG.siteUrl,
  logo = `${SEO_CONFIG.siteUrl}/logo.png`,
  description = SEO_CONFIG.defaultDescription,
  email = SEO_CONFIG.contactEmail,
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
 * Generates a Website JSON-LD schema with optional search action.
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
    inLanguage: SEO_CONFIG.locale.split("_")[0] || "en",
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
 * Generates an Article JSON-LD schema for blog posts and articles.
 */
export function generateArticleJsonLd(
  props: ArticleJsonLdProps
): Record<string, unknown> {
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
    inLanguage: SEO_CONFIG.locale.split("_")[0] || "en",
  };
}

/**
 * Generates a BlogPosting JSON-LD schema (more specific than Article).
 */
export function generateBlogPostingJsonLd(props: ArticleJsonLdProps) {
  const article = generateArticleJsonLd(props);
  return {
    ...article,
    "@type": "BlogPosting",
  };
}

/**
 * Generates a BreadcrumbList JSON-LD schema.
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
 * Generates an FAQ JSON-LD schema.
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
 * SoftwareApplication JSON-LD inputs. Keep features and rating in sync
 * with what's actually verifiable on the site.
 */
export interface SoftwareApplicationJsonLdProps {
  name?: string;
  description?: string;
  category?: string;
  features?: string[];
  pricing?: {
    lowPrice: string;
    highPrice: string;
    priceCurrency: string;
    offerCount: number;
  };
  rating?: {
    ratingValue: string;
    ratingCount: string;
  };
}

/**
 * Generates a SoftwareApplication JSON-LD schema.
 *
 * NOTE: aggregateRating is only included when `rating` is passed —
 * never invent ratings. Google penalizes fake review markup.
 */
export function generateSoftwareApplicationJsonLd({
  name = SEO_CONFIG.siteName,
  description = SEO_CONFIG.defaultDescription,
  category = "BusinessApplication",
  features = [],
  pricing,
  rating,
}: SoftwareApplicationJsonLdProps = {}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: SEO_CONFIG.siteUrl,
    applicationCategory: category,
    operatingSystem: "Web",
    featureList: features,
  };

  if (pricing) {
    schema.offers = {
      "@type": "AggregateOffer",
      lowPrice: pricing.lowPrice,
      highPrice: pricing.highPrice,
      priceCurrency: pricing.priceCurrency,
      offerCount: pricing.offerCount,
    };
  }

  if (rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.ratingValue,
      ratingCount: rating.ratingCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

/**
 * Generates a Product JSON-LD schema (e-commerce / pricing plans).
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

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Creates an absolute URL from a relative path.
 */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SEO_CONFIG.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Truncates text for meta descriptions (default max 155 chars).
 */
export function truncateDescription(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + "...";
}

/**
 * Generates a URL-safe slug from a title.
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
 * Generates a canonical URL for a page (strips query and hash).
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.split("?")[0].split("#")[0];
  return absoluteUrl(cleanPath);
}

// =============================================================================
// REACT COMPONENT
// =============================================================================

/**
 * JSON-LD script component for structured data.
 *
 * Usage: `<JsonLd data={generateArticleJsonLd(...)} />`
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}

// =============================================================================
// LEGACY / COMPATIBILITY EXPORTS
// =============================================================================

/**
 * @deprecated Use `generateMetadata()` instead.
 */
export function generateOpenGraphMetadata(props: SEOProps = {}) {
  const metadata = generateMetadata(props);
  return metadata.openGraph;
}

/**
 * @deprecated Use `generateMetadata()` instead.
 */
export function generateTwitterMetadata(props: SEOProps = {}) {
  const metadata = generateMetadata(props);
  return metadata.twitter;
}
