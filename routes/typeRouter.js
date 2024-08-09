import Router from "express";
import { typeController } from "../controllers/typeController.js";

export const typeRouter = new Router();

typeRouter.post("/", typeController.create);
typeRouter.get("/", typeController.getAll);
