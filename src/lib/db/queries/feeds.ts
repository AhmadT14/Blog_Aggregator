import { readConfig } from "src/config";
import { db } from "..";
import { feeds, users } from "../schema";
import { eq, sql } from "drizzle-orm";

export async function createFeed(name: string, url: string) {
    const config = readConfig()
    const userName = config.currentUserName
    const user = await db.select().from(users).where(eq(users.name, userName)).then(res => res[0])
    const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: user.id }).returning();
    return result;
}
export async function getfeeds() {
    const result = await db.select().from(feeds);
    return result;
}
export async function markFeedFetched(feedId: string) {
    const result = await db.update(feeds).set({ last_fetched_at: new Date(), updatedAt: new Date() }).where(eq(feeds.id, feedId)).returning();
    return result;
}
export async function getNextFeedToFetch() {
    const feed = await db.select().from(feeds).orderBy(sql`${feeds.last_fetched_at} DESC NULLS FIRST`).limit(1);
    return feed[0];
}