import { readConfig } from "src/config";
import { db } from "..";
import { feeds, users } from "../schema";
import { eq } from "drizzle-orm";

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