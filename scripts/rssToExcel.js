import Parser from "rss-parser";
import XLSX from "xlsx";

const parser =
  new Parser();

async function convertRSS() {

  // FETCH RSS
  const feed =
    await parser.parseURL(
      "https://www.autopunditz.com/blog-feed.xml"
    );

  console.log(
    "TOTAL POSTS:",
    feed.items.length
  );

  // CONVERT TO JSON
  const blogs =
    feed.items.map(
      (item) => {

        // SLUG
        const slug =
          item.link
            .split("/")
            .pop();

        return {

          title:
            item.title || "",

          metaTitle:
            item.title || "",

          metaDescription:
            item.contentSnippet ||
            item.description ||
            "",

          keywords:
            item.categories?.join(
              ", "
            ) || "",

          ogImage:
            item.enclosure?.url ||
            "",

          imageAlt:
            item.title || "",

          category:
            item.categories?.[0] ||
            "News",

          subCategory:
            item.categories?.[1] ||
            "General",

          slug,

          status:
            "published",

          publishAt:
            item.pubDate,

          url:
            item.link,
        };
      }
    );

  // CREATE EXCEL
  const worksheet =
    XLSX.utils.json_to_sheet(
      blogs
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Blogs"
  );

  // SAVE EXCEL
  XLSX.writeFile(
    workbook,
    "autopunditz-blogs.xlsx"
  );

  // SAVE JSON
  const jsonWorkbook =
    XLSX.utils.book_new();

  console.log(
    "EXCEL GENERATED"
  );

  console.log(
    "TOTAL:",
    blogs.length
  );
}

convertRSS();