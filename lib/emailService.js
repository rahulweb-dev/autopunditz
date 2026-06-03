import { Resend } from "resend";
import { getBlogUrl } from "@/lib/blogUrl";

const SITE_URL = "https://www.autopunditz.com";
const FROM_EMAIL = "AutoPunditz <newsletter@autopunditz.com>";
const BATCH_SIZE = 100;

export async function sendBlogNewsletter(blog, subscribers) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping newsletter.");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const activeEmails = subscribers
    .filter((s) => s.isActive)
    .map((s) => s.email);

  if (activeEmails.length === 0) return;

  const subject = `New Post: ${blog.title}`;

  for (let i = 0; i < activeEmails.length; i += BATCH_SIZE) {
    const batch = activeEmails.slice(i, i + BATCH_SIZE);

    const messages = batch.map((email) => ({
      from: FROM_EMAIL,
      to: email,
      subject,
      html: buildEmailHTML(blog, email),
    }));

    try {
      await resend.batch.send(messages);
      console.log(
        `Newsletter batch ${Math.floor(i / BATCH_SIZE) + 1} sent (${batch.length} emails)`
      );
    } catch (err) {
      console.error(`Newsletter batch error at index ${i}:`, err);
    }

    // 1s gap between batches to respect Resend rate limits
    if (i + BATCH_SIZE < activeEmails.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

function buildEmailHTML(blog, recipientEmail) {
  const blogUrl = getBlogUrl(blog);
  const unsubUrl = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(recipientEmail)}`;

  const excerpt = blog.content
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 220);

  const image =
    blog.ogImage && blog.ogImage.startsWith("http")
      ? blog.ogImage
      : blog.ogImage
      ? `${SITE_URL}${blog.ogImage}`
      : null;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${blog.metaTitle || blog.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#111111;padding:22px 32px;">
              <a href="${SITE_URL}" style="text-decoration:none;">
                <span style="color:#f5a623;font-size:24px;font-weight:bold;letter-spacing:-0.5px;">AutoPunditz</span>
                <span style="display:block;color:#888888;font-size:12px;margin-top:2px;font-family:Arial,sans-serif;">India's #1 Auto News</span>
              </a>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          ${
            image
              ? `<tr>
            <td style="padding:0;">
              <img src="${image}" alt="${blog.imageAlt || blog.title}"
                style="width:100%;height:280px;object-fit:cover;display:block;" />
            </td>
          </tr>`
              : ""
          }

          <!-- CATEGORY BADGE + CONTENT -->
          <tr>
            <td style="padding:32px 32px 8px;">
              <span style="display:inline-block;background:#f5a623;color:#111;font-size:11px;font-weight:bold;
                letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:4px;
                font-family:Arial,sans-serif;">
                ${blog.category || "News"} › ${blog.subCategory || ""}
              </span>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 32px 24px;">
              <h1 style="margin:0 0 16px;color:#111111;font-size:26px;line-height:1.35;font-weight:bold;">
                ${blog.title}
              </h1>
              <p style="margin:0 0 28px;color:#555555;font-size:15px;line-height:1.75;font-family:Arial,sans-serif;">
                ${excerpt}…
              </p>
              <a href="${blogUrl}"
                style="display:inline-block;background:#f5a623;color:#111111;padding:13px 28px;
                  border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;
                  font-family:Arial,sans-serif;letter-spacing:0.3px;">
                Read Full Story →
              </a>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none;border-top:1px solid #eeeeee;margin:0;" />
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 32px;background:#fafafa;">
              <p style="margin:0;color:#999999;font-size:12px;text-align:center;font-family:Arial,sans-serif;line-height:1.6;">
                You're receiving this email because you subscribed to AutoPunditz news updates.<br />
                <a href="${unsubUrl}" style="color:#999999;text-decoration:underline;">Unsubscribe</a>
                &nbsp;·&nbsp;
                <a href="${SITE_URL}" style="color:#999999;text-decoration:underline;">Visit Website</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
