import { feeds, users } from "./lib/db/schema";
import { createFeed } from "./lib/db/queries/feeds";
export async function printFeed(feed: typeof feeds, user: typeof users) {
console.log(feed, user)
}
export async function handleraddfeed(cmdName: string, name:string, url:string) {
    if(!(name && url)) {
        console.error("Feed name and URL are required.");
        process.exit(1);
    }
    await createFeed(name, url);
}