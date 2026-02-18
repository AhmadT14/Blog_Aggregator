type CommandHandler = (cmdName: string, ...args: string[]) => void;
export type CommandsRegistry = {[name: string]: CommandHandler};


export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
    registry[cmdName] = handler;
}
export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]){
    const handler = registry[cmdName];
    if(handler){
        handler(cmdName, ...args);
    } else {
        throw new Error("Command not found: " + cmdName);
    }
}