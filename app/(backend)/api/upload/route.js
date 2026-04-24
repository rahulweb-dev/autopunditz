import { imagekit } from "@/lib/imagekit";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await imagekit.upload({
      file: body.file,        // base64
      fileName: body.fileName,
      folder: "blogs",        // optional folder
    });

    return Response.json({
      url: result.url,        // ✅ final image URL
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}