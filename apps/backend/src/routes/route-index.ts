import { Router } from "express";
import mapRouter from "./map-router.js";

const router = Router();

router.get("/");

router.use("/map", mapRouter);

export default router;
