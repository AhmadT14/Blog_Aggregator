import { User } from "./usersCommand";
import { deleteFeedFollowsForUser } from "../lib/db/queries/feedFollow";

export async function handlerunfollow(cmdName: string, user: User, url: string) {
    await deleteFeedFollowsForUser(user.name);
    console.log(user.name + " has unfollowed " + url);
}