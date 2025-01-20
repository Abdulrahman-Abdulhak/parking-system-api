import { createActivityLogModel } from "../models/index.js";
import { getUserID } from "./session/index.js";

export const addActivity = async (req, activity, signature) => {
  await createActivityLogModel().create({
    action,
    signature,
    timestamp: Date.now(),
    userId: getUserID(req),
  });
};
