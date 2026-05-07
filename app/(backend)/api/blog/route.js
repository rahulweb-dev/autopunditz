import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { slugify } from "@/lib/slugify";

// 🔄 AUTO PUBLISH
async function autoPublish() {

  await Blog.updateMany(
    {
      status: "scheduled",
      publishAt: {
        $lte: new Date(),
      },
    },
    {
      $set: {
        status: "published",
      },
    }
  );

}

// ✅ GET ALL BLOGS
export async function GET() {

  try {

    await connectDB();

    await autoPublish();

    const blogs =
      await Blog.find()
        .sort({ createdAt: -1 });

    return Response.json(
      blogs
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ✅ CREATE BLOG
export async function POST(req) {

  await connectDB();

  try {

    const {
      title,
      category,
      subCategory,
      content,
      status,
      publishAt,
    } = await req.json();

    // ✅ VALIDATIONS
    if (!title) {

      return Response.json(
        {
          error: "Title required",
        },
        {
          status: 400,
        }
      );

    }

    if (!content) {

      return Response.json(
        {
          error: "Content required",
        },
        {
          status: 400,
        }
      );

    }

    if (!category) {

      return Response.json(
        {
          error: "Category required",
        },
        {
          status: 400,
        }
      );

    }

    if (!subCategory) {

      return Response.json(
        {
          error: "SubCategory required",
        },
        {
          status: 400,
        }
      );

    }

    const now = new Date();

    let finalStatus =
      status || "draft";

    // ✅ AUTO STATUS
    if (publishAt) {

      const publishDate =
        new Date(publishAt);

      if (publishDate > now) {

        finalStatus =
          "scheduled";

      } else {

        finalStatus =
          "published";

      }

    }

    // ✅ AUTO GENERATE SLUG
    const slug =
      slugify(title);

    console.log(
      "GENERATED SLUG:",
      slug
    );

    // ✅ CREATE BLOG
    const blog =
      await Blog.create({

        title,

        // ✅ IMPORTANT
        slug,

        category,

        subCategory,

        content,

        status: finalStatus,

        publishAt,

      });

    return Response.json(
      blog,
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(
      "POST BLOG ERROR:",
      error
    );

    return Response.json(
      {
        error:
          error.message ||
          "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }

}