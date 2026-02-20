import { readConfig } from "../config";
import { getUsers } from "../lib/db/queries/users";
import { users } from "../lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export async function handlerUsers() {
  for (const user of await getUsers()) {
    if(readConfig().currentUserName === user.name) {
      console.log('* ' + user.name + ' (current)');
    } else {
      console.log('* ' + user.name);
    }
}
  process.exit(0);
}