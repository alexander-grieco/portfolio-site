import rss from '@astrojs/rss';

export function GET(context) {
  const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true });
  const posts = Object.values(postImportResult);
  return rss({
    stylesheet: '/rss/styles.xsl',
    title: 'Alex Grieco\'s Astro Blog',
    description: 'A humble Astronaut’s attempt at a blog',
    site: context.site,
    items: posts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
      description: post.frontmatter.description,
      customData: `
        <author>${post.frontmatter.author}</author>
      `
    })),
  });
}
