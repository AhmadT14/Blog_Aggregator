import { db } from "..";
import { posts } from "../schema";
import { eq, desc } from "drizzle-orm";

export async function createPost(postData: any){
    const post = await db.insert(posts).values({ 
        title: postData.title,
        url: postData.url,
        description: postData.description,
        published_at: postData.published_at,
        feed_id: postData.feed_id
    }).onConflictDoNothing().returning();
    return post;
}
export async function getPostsForUser(limit:number=2){
    const post = await db.select().from(posts).orderBy(desc(posts.published_at)).limit(limit);
    return post;
}