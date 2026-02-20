import { getPostsForUser } from "../lib/db/queries/posts";


export async function handlerBrowse(cmdName: string, user: any, limit: string){ {
  const posts = await getPostsForUser(parseInt(limit));
  console.log(posts);
}}