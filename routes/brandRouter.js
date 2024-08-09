import Router from "express";
import { brandController } from "../controllers/brandController.js";

export const brandRouter = new Router();

brandRouter.post("/", brandController.create);
brandRouter.get("/", brandController.getAll);
