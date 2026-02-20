import { UserCommandHandler} from './usersCommand';
import { CommandHandler} from './configCommands';
import { readConfig } from './config';
import { getUserByName } from './lib/db/queries/users';

export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]) => {
        const config = readConfig();
        const user = await getUserByName(config.currentUserName);
        if (!user) {
            throw new Error('User not logged in');
        }
        await handler(cmdName, user, ...args);
    };
}