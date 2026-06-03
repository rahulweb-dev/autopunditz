import { GoogleAuth } from "google-auth-library";

const INDEXING_API =
  "https://indexing.googleapis.com/v3/urlNotifications:publish";

const SCOPES = ["https://www.googleapis.com/auth/indexing"];

async function getAccessToken() {
  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

/**
 * Notifies Google to immediately crawl/index a URL.
 * type: "URL_UPDATED" (new or updated) | "URL_DELETED" (removed)
 */
export async function notifyGoogleIndexing(url, type = "URL_UPDATED") {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn("Google Indexing API credentials not set — skipping.");
    return;
  }

  try {
    const token = await getAccessToken();

    const res = await fetch(INDEXING_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url, type }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Google Indexing API error:", data);
    } else {
      console.log(`Google Indexing API: ${type} → ${url}`, data);
    }

    return data;
  } catch (err) {
    console.error("Google Indexing API exception:", err);
  }
}
