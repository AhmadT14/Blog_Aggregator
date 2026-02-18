import { setUser } from "./config";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    console.error("No user name provided.");
    process.exit(1);
  }
  setUser(args[0]);
  console.log("User set to: " + args[0]);
}
