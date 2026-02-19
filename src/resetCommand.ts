import { deleteUsers } from "./lib/db/queries/users";

export async function handlerReset() {
  await deleteUsers();
  console.log("Users were deleted." );
  process.exit(0);
}