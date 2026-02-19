import { deleteUsers } from "./lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
  await deleteUsers();
  console.log("Users were deleted." );
  process.exit(0);
}