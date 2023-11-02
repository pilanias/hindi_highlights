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
    name: "siteMetadata.webMaster",
    email: "siteMetadata.webMastereMail",
    link: "siteMetadata.webMaster.twitter",
  },
  managingEditor: {
    name: "dinesh"
  }
});

allBlogs
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  .forEach((post) => {
    const url = `${siteMetadata.siteUrl}/blog/${post._raw.flattenedPath}`;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.summary,
      date: parseISO(post.date),
      category: post.tags.map((name) => ({ name })),
      image: `${siteMetadata.siteUrl}${post._raw.flattenedPath}/cover.png`,
      author: [{
        name: siteMetadata.author,
        email: "siteMetadata.author.email",
        link: "siteMetadata.author.twitter",
      }],
    });
  });

writeFileSync("./public/feed.xml", feed.rss2(), { encoding: "utf-8" });