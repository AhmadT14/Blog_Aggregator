import { getNextFeedToFetch, markFeedFetched } from "./lib/db/queries/feeds";
import { createPost } from "./lib/db/queries/posts";
import { fetchFeed } from "./rssFeed";


export async function scrapeFeeds() {
  try {
    const feed = await getNextFeedToFetch();
    if (!feed) {
      console.log("No feeds to fetch");
      return;
    }
    markFeedFetched(feed.id);
    const feedContent = await fetchFeed(feed.url);

    for (const item of feedContent.channel.item) {
      await createPost({title: item.title, url: item.link, description: item.description, published_at: new Date(item.pubDate), feed_id: feed.id});
    }
    console.log(`Successfully scraped feed: ${feed.name || feed.url}`);
  } catch (error) {
    console.error(`Error scraping feed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};