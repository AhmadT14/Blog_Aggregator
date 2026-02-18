import { registerCommand, runCommand } from "./configCommands";
import {CommandsRegistry} from "./configCommands";
import { handlerLogin } from "./loginConfigCommand";

import { argv } from "node:process";

function main() {
  const commandsRegistry: CommandsRegistry = {};
  registerCommand(commandsRegistry, "login", handlerLogin);

  if (argv.length > 2) {
    runCommand(commandsRegistry, argv[2], ...argv.slice(3));
  } else {
    console.error("Not enough arguments provided.");
    process.exit(1);
  }
}

main();
