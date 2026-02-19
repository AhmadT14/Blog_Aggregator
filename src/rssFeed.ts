import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const response=await fetch(feedURL,{headers:{"User-Agent":"blog_aggregator"}})
  const parser = new XMLParser();
  let jObj = parser.parse(await response.text());
  if(jObj.rss.channel === undefined) {
    throw new Error("Invalid RSS feed format");
  }
  const feed: RSSFeed = {
    channel: {
      title: jObj.rss.channel.title,
      link: jObj.rss.channel.link,
      description: jObj.rss.channel.description,
      item: [],
    },
  };
  
  const items: RSSItem[] = Array.isArray(jObj.rss.channel.item) ? jObj.rss.channel.item : [jObj.rss.channel.item];
if(Array.isArray(items)) {
  items.forEach((item: RSSItem) => {
    feed.channel.item.push(
      {
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate,
      }
    );
  });
  
}
  return feed;
}
