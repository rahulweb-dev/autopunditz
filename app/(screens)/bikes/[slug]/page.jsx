import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import ContinuousReader from "@/app/components/ContinuousReader";
import { buildNewsArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonLd";

export const revalidate = 3600;

const SITE_URL = "https://www.autopunditz.com";

async function getBlog(slug) {
  await connectDB();
  return Blog.findOne({ slug, status: "published" }).lean();
}

function serialize(blog) {
  return {
    _id: blog._id.toString(),
    slug: blog.slug,
    title: blog.title,
    metaTitle: blog.metaTitle || null,
    imageAlt: blog.imageAlt || null,
    ogImage: blog.ogImage || null,
    content: blog.content || "",
    category: blog.category || null,
    subCategory: blog.subCategory || null,
    createdAt: blog.createdAt?.toISOString?.() ?? null,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return { title: "Bikes News | AutoPunditz" };

  const image = blog.ogImage?.startsWith("http")
    ? blog.ogImage
    : blog.ogImage
    ? `${SITE_URL}${blog.ogImage}`
    : null;

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    keywords: blog.keywords,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      url: `${SITE_URL}/bikes/${slug}`,
      type: "article",
      publishedTime: blog.createdAt?.toISOString?.() ?? undefined,
      modifiedTime: blog.updatedAt?.toISOString?.() ?? undefined,
      images: image ? [{ url: image, alt: blog.imageAlt || blog.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      images: image ? [image] : [],
    },
    alternates: { canonical: `${SITE_URL}/bikes/${slug}` },
  };
}

export default async function BikeDetail({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return <div className="text-center py-20 text-xl">Article Not Found</div>;
  }

  const pageUrl = `${SITE_URL}/bikes/${slug}`;
  const articleJsonLd = buildNewsArticleJsonLd(blog, pageUrl);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Bikes", url: `${SITE_URL}/bikes` },
    { name: blog.title, url: pageUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ContinuousReader
        initialBlog={serialize(blog)}
        category={blog.category || "News"}
        subCategory={blog.subCategory || "Bikes"}
        basePath="/bikes"
      />
    </>
  );
}
