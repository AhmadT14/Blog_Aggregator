import { createFeedFollow, feedByUrl } from "../lib/db/queries/feedFollow";
import { User } from "./usersCommand";


export async function handlerfollow(cmdName: string, user: User, url: string) {
    await createFeedFollow(url);
    const feed = await feedByUrl(url);
    console.log(user.name + " is now following " + feed.name);
} 