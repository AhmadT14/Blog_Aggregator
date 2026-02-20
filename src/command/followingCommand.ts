import { getFeedFollowsForUser } from "../lib/db/queries/feedFollow";
import { User } from "./usersCommand";

export async function handlerfollowing(cmdName: string, user: User) {
    const userFeedFollows = await getFeedFollowsForUser(user.name);
    userFeedFollows.forEach(follow => {
        console.log(follow.feeds.name);
    });
}