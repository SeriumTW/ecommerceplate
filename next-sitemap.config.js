/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true,
};

export default sitemapConfig;
