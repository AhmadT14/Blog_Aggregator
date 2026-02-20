import { setUser } from "../config";
import { createUser, getUserByName } from "../lib/db/queries/users";

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    console.error("No name provided.");
    process.exit(1);
  }
  if(await getUserByName(args[0])){
    console.error("User already exists.");
    process.exit(1);
  }
   await createUser(args[0]);
  setUser(args[0]);
  console.log("User registered and set to: " + args[0]);
}