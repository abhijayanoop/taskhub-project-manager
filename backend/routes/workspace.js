import express from "express";
import { workspaceSchema } from "../libs/validate-schema.js";
import { validateRequest } from "zod-express-middleware";
import authMiddleware from "../middleware/auth-middleware.js";
import {
  createWorkspace,
  getWorkspaceDetails,
  getWorkspaceProjects,
  getWorkspaces,
} from "../controllers/workspace.js";

const Router = express.Router();

Router.post(
  "/",
  authMiddleware,
  validateRequest({ body: workspaceSchema }),
  createWorkspace
);

Router.get("/", authMiddleware, getWorkspaces);

Router.get("/:workspaceId", authMiddleware, getWorkspaceDetails);

Router.get("/:workspaceId/projects", authMiddleware, getWorkspaceProjects);

export default Router;
