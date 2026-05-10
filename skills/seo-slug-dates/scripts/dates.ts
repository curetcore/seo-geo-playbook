/**
 * @fileoverview Slug-based date distribution for programmatic SEO.
 *
 * Generates deterministic, per-slug `publishedAt` and `dateModified`
 * dates within ranges defined by content category. This avoids the
 * "content farm batch" signal that Google detects when 500+ pages
 * share identical dates.
 *
 * Usage:
 *   import { slugToDates } from "@/lib/seo/dates";
 *   const { datePublished, dateModified } = slugToDates("musicos", "niche");
 *
 * IMPORTANT: edit `PUBLISHED_RANGES` and `UPDATED_RANGE` to match your
 * project's actual founding date. Never use dates before the project
 * launched (breaks narrative integrity).
 */

export type DateCategory =
  | "glossary"
  | "niche"
  | "guide"
  | "tool"
  | "comparison"
  | "alternative"
  | "useCase"
  | "integration"
  | "template"
  | "trend"
  | "blog";

// =============================================================================
// CONFIG — EDIT THESE RANGES TO MATCH YOUR PROJECT
// =============================================================================

/**
 * Per-category `publishedAt` ranges. The hash of each slug picks a date
 * within its category's range. Adjust ranges based on your project's
 * founding date — never set ranges before the official launch.
 */
const PUBLISHED_RANGES: Record<DateCategory, { start: string; end: string }> = {
  glossary: { start: "2025-12-01", end: "2026-03-15" },   // Evergreen temprano
  niche: { start: "2025-12-15", end: "2026-03-20" },      // Foundational
  guide: { start: "2026-01-01", end: "2026-04-01" },      // Tutoriales
  tool: { start: "2026-01-15", end: "2026-04-10" },       // Tech reciente
  comparison: { start: "2026-02-01", end: "2026-04-15" }, // Pricing cambia
  alternative: { start: "2026-02-01", end: "2026-04-15" },
  useCase: { start: "2026-01-10", end: "2026-04-01" },
  integration: { start: "2025-12-20", end: "2026-04-05" },
  template: { start: "2026-01-01", end: "2026-03-30" },
  trend: { start: "2026-03-01", end: "2026-04-20" },      // Por definición reciente
  blog: { start: "2025-12-01", end: "2026-04-20" },
};

/**
 * `updatedAt` range — all "actively maintained" pages should look like
 * they were touched within the last ~8 weeks.
 */
const UPDATED_RANGE = { start: "2026-02-28", end: "2026-04-24" };

// =============================================================================
// IMPLEMENTATION
// =============================================================================

/**
 * djb2 hash — 32-bit, deterministic across deploys.
 */
function hashSlug(slug: string): number {
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) + hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0]!;
}

function daysBetween(start: string, end: string): number {
  return Math.floor(
    (new Date(end).getTime() - new Date(start).getTime()) / 86400000
  );
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return toDateString(d);
}

/**
 * Maps a slug to a `publishedAt` date within its category's range.
 * Same slug always returns the same date.
 */
export function slugToPublishedDate(slug: string, category: DateCategory): string {
  const range = PUBLISHED_RANGES[category];
  const total = daysBetween(range.start, range.end);
  if (total <= 0) return range.start;
  const offset = hashSlug(slug) % total;
  return addDays(range.start, offset);
}

/**
 * Maps a slug to a `dateModified`. Uses a different hash than `publishedAt`
 * to avoid 1:1 correlation. Guardrail: `updatedAt` is never before `publishedAt`.
 */
export function slugToModifiedDate(slug: string, category: DateCategory): string {
  const publishedAt = slugToPublishedDate(slug, category);
  // Different hash to break correlation
  const reversed = [...slug].reverse().join("") + "-updated";
  const total = daysBetween(UPDATED_RANGE.start, UPDATED_RANGE.end);
  if (total <= 0) return UPDATED_RANGE.end;
  const offset = hashSlug(reversed) % total;
  const candidate = addDays(UPDATED_RANGE.start, offset);
  // Guardrail: updatedAt never earlier than publishedAt
  return new Date(candidate) < new Date(publishedAt) ? publishedAt : candidate;
}

/**
 * Convenience: returns both dates for a slug + category.
 */
export function slugToDates(slug: string, category: DateCategory) {
  return {
    datePublished: slugToPublishedDate(slug, category),
    dateModified: slugToModifiedDate(slug, category),
  };
}
