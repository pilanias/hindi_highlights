import { compareDesc, parseISO } from "date-fns";
import { Feed } from "feed";
import { writeFileSync } from "fs";
import { allBlogs } from "./.contentlayer/generated/index.mjs";
import siteMetadata from "./src/utils/siteMetaData.js";


const feed = new Feed({
  title: siteMetadata.title,
  description: siteMetadata.description,
  id: siteMetadata.id,
  link: siteMetadata.siteUrl,
  language: siteMetadata.language,
  favicon: `${siteMetadata.siteUrl}/favicon.ico`,
  image: `${siteMetadata.siteUrl}/favicon.png`,
  copyright: siteMetadata.copyright,
  webMaster: {
    name: "sandeep pilania",
    email: "pilanias38@gmail.com",
  },
  managingEditor: {
    name: "dinesh"
  }
});

allBlogs
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  .forEach((post) => {
    const url = `${siteMetadata.siteUrl}/blogs/${post._raw.flattenedPath}`;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.summary,
      date: parseISO(post.publishedAt),
      update: parseISO(post.updatedAt),
      category: post.tags.map((name) => ({ name })),
      image: `${siteMetadata.siteUrl}/blogs/${post._raw.flattenedPath}/cover.jpg`,
      author: [{
        name: siteMetadata.author,
        email: siteMetadata.email,
        link: siteMetadata.twitter,
      }],
    });
  });

writeFileSync("./public/feed.xml", feed.rss2(), { encoding: "utf-8" });