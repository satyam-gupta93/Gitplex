import express from  "express";
import { createRepository, deleteRepositoryById, fetchRepositoryById, fetchRepositoryByName, fetchRepositoryForCurrentUser, getAllRepositories, toggleVisibilityById, updateRepositoryById } from "../controllers/repoController.js";

const repoRouter = express.Router();

repoRouter.post("/repo/create", createRepository);
repoRouter.get("/repo/all", getAllRepositories);
repoRouter.get("/repo/:id", fetchRepositoryById);
repoRouter.get("/repo/name/:name",fetchRepositoryByName );
repoRouter.get("/repo/user/:userID",fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", updateRepositoryById);
repoRouter.delete("/repo/delete/:id", deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", toggleVisibilityById);


export default repoRouter;

