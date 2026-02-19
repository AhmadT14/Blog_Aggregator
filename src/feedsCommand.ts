import { getfeeds } from "./lib/db/queries/feeds";
import { getUsers } from "./lib/db/queries/users";

export async function handlerfeeds(cmdName: string, ...args: string[]) {
  const feeds = await getfeeds();
  const users = await getUsers();
  feeds.forEach(feed => {
    console.log(feed.name);
    console.log(feed.url);
    const user = users.find(u => u.id === feed.user_id);
    console.log(user?.name);
  });
}