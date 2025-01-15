import dotenv from "dotenv";
import { createReservationsTable, createUsersTable } from "./models/index.js";

/**
 * Call this function at the very start of your application to:
 * - Add your .env file
 * - Initialize DB with tables
 */
export default async function init() {
  dotenv.config();

  try {
    await createUsersTable();
    await createReservationsTable();
  } catch (error) {
    return false;
  }

  return true;
}
