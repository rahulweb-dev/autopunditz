const SITE_URL = "https://www.autopunditz.com";
const LOGO_URL = `${SITE_URL}/logo.png`;

const PUBLISHER = {
  "@type": "Organization",
  name: "AutoPunditz",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 400,
    height: 60,
  },
};

/**
 * Builds a NewsArticle JSON-LD object for a blog post.
 * Pass the full blog document (from Mongoose/lean).
 */
export function buildNewsArticleJsonLd(blog, pageUrl) {
  const image =
    blog.ogImage && blog.ogImage.startsWith("http")
      ? blog.ogImage
      : blog.ogImage
      ? `${SITE_URL}${blog.ogImage}`
      : LOGO_URL;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.metaTitle || blog.title,
    description: blog.metaDescription || "",
    image: [image],
    datePublished: blog.createdAt
      ? new Date(blog.createdAt).toISOString()
      : new Date().toISOString(),
    dateModified: blog.updatedAt
      ? new Date(blog.updatedAt).toISOString()
      : new Date().toISOString(),
    author: PUBLISHER,
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    keywords: blog.keywords || "",
    articleSection: blog.subCategory || blog.category || "Auto News",
    inLanguage: "en-IN",
  };
}

/**
 * Builds a BreadcrumbList JSON-LD object for listing / detail pages.
 * items: [{ name, url }]
 */
export function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
