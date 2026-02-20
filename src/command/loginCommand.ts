import { setUser } from "../config";
import { getUserByName } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    console.error("No user name provided.");
    process.exit(1);
  }
  if(!(await getUserByName(args[0]))){
      console.error("User doesn't exist.");
      process.exit(1);
    }
  setUser(args[0]);
  console.log("User set to: " + args[0]);
}
