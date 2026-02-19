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

async function main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry, "login",  handlerLogin);
  registerCommand(commandsRegistry, "register", handlerRegister);
  registerCommand(commandsRegistry, "reset", handlerReset);
  registerCommand(commandsRegistry, "users", handlerUsers);
  registerCommand(commandsRegistry, "agg", handleragg);
  registerCommand(commandsRegistry, "addfeed", handleraddfeed);
  registerCommand(commandsRegistry, "feeds", handlerfeeds);

  if (argv.length > 2) {
    await runCommand(commandsRegistry, argv[2], ...argv.slice(3));
    process.exit(0);
  } else {
    console.error("Not enough arguments provided.");
    process.exit(1);
  }
}

await main();
