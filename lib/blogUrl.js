const SITE_URL = "https://www.autopunditz.com";

/**
 * Returns the canonical public URL for a blog post based on its category.
 * All routes use the slug, never the MongoDB _id.
 */
export function getBlogUrl(blog) {
  const cat = blog.category?.toLowerCase() || "";
  const sub = blog.subCategory?.toLowerCase() || "";

  if (cat === "news") {
    if (sub === "bikes") return `${SITE_URL}/bikes/${blog.slug}`;
    if (sub === "cars") return `${SITE_URL}/cars/${blog.slug}`;
  }
  if (cat === "editorials") return `${SITE_URL}/editorials/${blog.slug}`;
  if (cat === "marketanalysis") return `${SITE_URL}/market-analysis/${blog.slug}`;
  if (cat === "sales") {
    const subSlug = blog.subCategory
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return `${SITE_URL}/sales-analysis/${subSlug}/${blog.slug}`;
  }

  return `${SITE_URL}/blogs/${blog.slug}`;
}
