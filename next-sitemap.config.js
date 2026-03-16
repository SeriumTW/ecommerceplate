import config from "./src/config/config.json" with { type: "json" };

const siteUrl = (process.env.SITE_URL || config.site.base_url).replace(
  /\/$/,
  "",
);

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl,
  generateRobotsTxt: true,
  alternateRefs: [
    { href: `${siteUrl}/mx`, hreflang: "es-MX" },
    { href: `${siteUrl}/it`, hreflang: "it-IT" },
    { href: `${siteUrl}/en`, hreflang: "en-US" },
    { href: `${siteUrl}/mx`, hreflang: "x-default" },
  ],
};

export default sitemapConfig;
