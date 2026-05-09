import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { slugify } from "@/lib/slugify";

// ✅ GET SINGLE BLOG
export async function GET(
  req,
  { params }
) {

  try {

    await connectDB();

    // ✅ USE SLUG
    const { slug } = await params;

    console.log(
      "GET SLUG:",
      slug
    );

    const blog =
      await Blog.findOne({
        slug: slug.trim(),
      });

    if (!blog) {

      return Response.json(
        {
          error:
            "Blog not found",
        },
        {
          status: 404,
        }
      );

    }

    return Response.json(
      blog
    );

  } catch (err) {

    console.error(err);

    return Response.json(
      {
        error:
          "Server error",
      },
      {
        status: 500,
      }
    );

  }

}

// ✅ UPDATE BLOG
export async function PUT(
  req,
  { params }
) {

  try {

    await connectDB();

    const { slug } =
      await params;

    const body =
      await req.json();

    const updated =
      await Blog.findOneAndUpdate(
        {
          slug,
        },
        {
          title: body.title,

          // ✅ AUTO SLUG
          slug: slugify(
            body.title
          ),

          category:
            body.category,

          subCategory:
            body.subCategory,

          content:
            body.content,

          status:
            body.status,

          publishAt:
            body.publishAt,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updated) {

      return Response.json(
        {
          error:
            "Blog not found",
        },
        {
          status: 404,
        }
      );

    }

    return Response.json(
      updated
    );

  } catch (err) {

    console.error(
      "PUT ERROR:",
      err
    );

    return Response.json(
      {
        error:
          "Update failed",
      },
      {
        status: 500,
      }
    );

  }

}

// ✅ DELETE BLOG
export async function DELETE(
  req,
  { params }
) {

  try {

    await connectDB();

    // ✅ NEXT 16
    const { slug } =
      await params;



    const deleted =
      await Blog.findOneAndDelete(
        {
          slug: slug.trim(),
        }
      );

    console.log(
      "DELETED:",
      deleted
    );

    if (!deleted) {

      return Response.json(
        {
          error:
            "Blog not found",
        },
        {
          status: 404,
        }
      );

    }

    return Response.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );

  } catch (err) {

    console.error(
      "DELETE ERROR:",
      err
    );

    return Response.json(
      {
        error:
          "Delete failed",
      },
      {
        status: 500,
      }
    );

  }

}