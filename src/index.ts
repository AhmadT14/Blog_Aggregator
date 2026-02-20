import { registerCommand, runCommand } from "./configCommands";
import {CommandsRegistry} from "./configCommands";
import { handlerLogin } from "./loginCommand";
import { argv } from "node:process";
import { handlerRegister } from "./registerCommand";
import { handlerReset } from "./resetCommand";
import { handlerUsers } from "./usersCommand";
import { handleragg } from "./aggCommand";
import { handleraddfeed } from "./addfeedCommand";
import { handlerfeeds } from "./feedsCommand";
import { handlerfollow } from "./followCommand";
import { handlerfollowing } from "./followingCommand";
import { handlerunfollow } from "./unfollowCommand";
import { middlewareLoggedIn } from "./middleware";

async function main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry, "login",  handlerLogin);
  registerCommand(commandsRegistry, "register", handlerRegister);
  registerCommand(commandsRegistry, "reset", handlerReset);
  registerCommand(commandsRegistry, "users", handlerUsers);
  registerCommand(commandsRegistry, "agg", handleragg);
  registerCommand(commandsRegistry, "addfeed", middlewareLoggedIn(handleraddfeed));
  registerCommand(commandsRegistry, "feeds", handlerfeeds);
  registerCommand(commandsRegistry, "follow", middlewareLoggedIn(handlerfollow));
  registerCommand(commandsRegistry, "following", middlewareLoggedIn(handlerfollowing));
  registerCommand(commandsRegistry, "unfollow", middlewareLoggedIn(handlerunfollow));

  if (argv.length > 2) {
    await runCommand(commandsRegistry, argv[2], ...argv.slice(3));
    process.exit(0);
  } else {
    console.error("Not enough arguments provided.");
    process.exit(1);
  }
}

await main();
