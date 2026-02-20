import { registerCommand, runCommand, CommandsRegistry} from "./config";
import { handlerLogin } from "./command/loginCommand";
import { argv } from "node:process";
import { handlerRegister } from "./command/registerCommand";
import { handlerReset } from "./command/resetCommand";
import { handlerUsers } from "./command/usersCommand";
import { handleragg } from "./command/aggCommand";
import { handleraddfeed } from "./command/addfeedCommand";
import { handlerfeeds } from "./command/feedsCommand";
import { handlerfollow } from "./command/followCommand";
import { handlerfollowing } from "./command/followingCommand";
import { handlerunfollow } from "./command/unfollowCommand";
import { middlewareLoggedIn } from "./middleware";
import { handlerBrowse } from "./command/browseCommand";

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
  registerCommand(commandsRegistry, "browse", middlewareLoggedIn(handlerBrowse));

  if (argv.length > 2) {
    await runCommand(commandsRegistry, argv[2], ...argv.slice(3));
    process.exit(0);
  } else {
    console.error("Not enough arguments provided.");
    process.exit(1);
  }
}

await main();
