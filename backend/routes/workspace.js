import express from "express";
import {
  inviteMemberSchema,
  workspaceSchema,
} from "../libs/validate-schema.js";
import { validateRequest } from "zod-express-middleware";
import authMiddleware from "../middleware/auth-middleware.js";
import {
  acceptGenerateInvite,
  acceptInviteByToken,
  createWorkspace,
  getWorkspaceDetails,
  getWorkspaceProjects,
  getWorkspaces,
  getWorkspaceStats,
  inviteUserToWorkspace,
} from "../controllers/workspace.js";
import z from "zod";

const Router = express.Router();

Router.post(
  "/",
  authMiddleware,
  validateRequest({ body: workspaceSchema }),
  createWorkspace
);

Router.post(
  "/accept-invite-token",
  authMiddleware,
  validateRequest({ body: z.object({ token: z.string() }) }),
  acceptInviteByToken
);

Router.post(
  "/:workspaceId/invite-member",
  authMiddleware,
  validateRequest({
    params: z.object({ workspaceId: z.string() }),
    body: inviteMemberSchema,
  }),
  inviteUserToWorkspace
);

Router.post(
  "/:workspaceId/accept-general-invite",
  authMiddleware,
  validateRequest({ params: { workspaceId: z.string() } }),
  acceptGenerateInvite
);

Router.get("/", authMiddleware, getWorkspaces);

Router.get("/:workspaceId", authMiddleware, getWorkspaceDetails);

Router.get("/:workspaceId/projects", authMiddleware, getWorkspaceProjects);

Router.get("/:workspaceId/stats", authMiddleware, getWorkspaceStats);

export default Router;
