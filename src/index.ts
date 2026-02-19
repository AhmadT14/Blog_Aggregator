import { registerCommand, runCommand } from "./configCommands";
import {CommandsRegistry} from "./configCommands";
import { handlerLogin } from "./loginCommand";
import { argv } from "node:process";
import { handlerRegister } from "./registerCommand";
import { handlerReset } from "./resetCommand";
import { handlerUsers } from "./usersCommand";

async function main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry, "login",  handlerLogin);
  registerCommand(commandsRegistry, "register", handlerRegister);
  registerCommand(commandsRegistry, "reset", handlerReset);
  registerCommand(commandsRegistry, "users", handlerUsers);

  if (argv.length > 2) {
    await runCommand(commandsRegistry, argv[2], ...argv.slice(3));
  } else {
    console.error("Not enough arguments provided.");
    process.exit(1);
  }
  process.exit(0);
}

await main();
