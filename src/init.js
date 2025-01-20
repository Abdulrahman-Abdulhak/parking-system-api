import dotenv from "dotenv";
import {
  createPaymentsTable,
  createReservationsTable,
  createUsersTable,
} from "./models/index.js";

/**
 * Call this function at the very start of your application to:
 * - Add your .env file
 * - Initialize DB with tables
 */
export default async function init() {
  dotenv.config();

  //? Convert env string values to their JS corresponding values
  const { env } = process;
  for (const variable in env) {
    if (Object.prototype.hasOwnProperty.call(env, variable)) {
      const value = env[variable];

      if (value === "true") env[variable] = true;
      else if (value === "false") env[variable] = false;
      else if (!Number.isNaN(Number(value))) {
        env[variable] = Number.parseFloat(value);
      }
    }
  }

  try {
    await createUsersTable();
    await createReservationsTable();
    await createPaymentsTable();
  } catch (error) {
    return false;
  }

  return true;
}
