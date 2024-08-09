import Router from "express";

import { deviceRouter } from "./deviceRouter.js";
import { userRouter } from "./userRouter.js";
import { brandRouter } from "./brandRouter.js";
import { typeRouter } from "./typeRouter.js";

export const router = new Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
