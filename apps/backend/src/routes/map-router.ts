import { Router } from "express";
import { getMapTile } from "../controllers/map-controllers.js";

const mapRouter = Router();

mapRouter.get("/", (req, res, next) => {
  getMapTile(req, res, next);
});

export default mapRouter;
