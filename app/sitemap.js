import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { getBlogUrl } from "@/lib/blogUrl";

const SITE_URL = "https://www.autopunditz.com";

export default async function sitemap() {
  await connectDB();

  const blogs = await Blog.find({ status: "published" })
    .select("slug category subCategory updatedAt createdAt")
    .sort({ createdAt: -1 })
    .lean();

  const blogUrls = blogs.map((blog) => ({
    url: getBlogUrl(blog),
    lastModified: blog.updatedAt || blog.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/bikes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/cars`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/editorials`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/market-analysis`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...blogUrls,
  ];
}
