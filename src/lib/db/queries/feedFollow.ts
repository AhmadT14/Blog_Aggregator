import { readConfig } from "src/config";
import { db } from "..";
import { feeds, users, feed_follows } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeedFollow(url: string) {
    const config = readConfig()
    const userName = config.currentUserName
    const user = await db.select().from(users).where(eq(users.name, userName)).then(res => res[0])
    const feed = await db.select().from(feeds).where(eq(feeds.url, url)).then(res => res[0])

    const [result] = await db.insert(feed_follows).values({
        user_id:user.id,
        feed_id:feed.id,
    });
    return result;
}
export async function feedByUrl(url: string) {
    const result = await db.select().from(feeds).where(eq(feeds.url, url)).then(res => res[0]);
    return result;
}
export async function getFeedFollowsForUser(userName: string) {
    const results = await db.select().from(feed_follows).innerJoin(users,eq(feed_follows.user_id, users.id)).innerJoin(feeds,eq(feed_follows.feed_id, feeds.id)).where(eq(users.name, userName));
    return results;
}
export async function deleteFeedFollowsForUser(userName: string) {
    const user = await db.select().from(users).where(eq(users.name, userName)).then(res => res[0]);
    await db.delete(feed_follows).where(eq(feed_follows.user_id, user.id));
}