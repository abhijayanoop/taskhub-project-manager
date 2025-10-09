import ActivityLog from "../models/activity.js";

export const recordActivity = async (
  userId,
  action,
  resourceType,
  resourceId,
  details
) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      resourceId,
      resourceType,
      details,
    });
  } catch (err) {
    console.log(err);
  }
};
