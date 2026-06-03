import axios from "axios";
import xml2js from "xml2js";
import XLSX from "xlsx";

async function exportBlogs() {

  // FETCH SITEMAP
  const res =
    await axios.get(
      "https://www.autopunditz.com/blog-posts-sitemap.xml"
    );

  // PARSE XML
  const parsed =
    await xml2js.parseStringPromise(
      res.data
    );

  // ALL URLS
  const urls =
    parsed.urlset.url;

  console.log(
    "TOTAL BLOGS:",
    urls.length
  );

  // CONVERT
  const blogs =
    urls.map((item) => {

      const url =
        item.loc[0];

      const slug =
        url
          .split("/")
          .pop();

      return {

        url,

        slug,

        lastModified:
          item.lastmod?.[0] ||
          "",
      };
    });

  // EXCEL
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

  XLSX.writeFile(
    workbook,
    "all-autopunditz-blogs.xlsx"
  );

  console.log(
    "EXPORTED SUCCESSFULLY"
  );
}

exportBlogs();