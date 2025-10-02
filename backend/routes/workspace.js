import express from "express";
import { workspaceSchema } from "../libs/validate-schema.js";
import { validateRequest } from "zod-express-middleware";
import authMiddleware from "../middleware/auth-middleware.js";
import { createWorkspace, getWorkspaces } from "../controllers/workspace.js";

const Router = express.Router();

Router.post(
  "/",
  authMiddleware,
  validateRequest({ body: workspaceSchema }),
  createWorkspace
);

Router.get("/", authMiddleware, getWorkspaces);

export default Router;
