export default function sitemap() {
  const baseUrl = "https://yourdomain.com";

  const pages = [
    "book-cover-design",
    "ebook-formatting-kdp",
    "kdp-cover-design",
  ];

  return pages.map((page) => ({
    url: `${baseUrl}/${page}`,
  }));
}