import { readConfig } from "./config";
import { getUsers } from "./lib/db/queries/users";

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