
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://localhost:3000/', // Replace with your actual live domain
  changefreq: 'daily',
  sitemapSize: 7000,
  // generateRobotsTxt: true, // Optionally generate robots.txt
  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path, // The homepage
        changefreq: config.changefreq,
        priority: 1.0, // Highest priority for the homepage
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path, // All other pages
      changefreq: config.changefreq,
      priority: 0.9, // Slightly lower priority for other pages
      lastmod: new Date().toISOString(),
    };
  },
};
