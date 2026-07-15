import { catchAsync } from "../utils/catchAsync.js";
import { findMapTile } from "../db/queries.js";
import { NextFunction, Request, Response } from "express";
import * as zod from "zod";

const TileEnvelopeSchema = zod.object({
  x: zod.coerce.number(),
  y: zod.coerce.number(),
  z: zod.coerce.number(),
});

export const getMapTile = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const tileEnvelope = TileEnvelopeSchema.parse(req.query);

  const mapTile = await findMapTile(tileEnvelope);

  res.status(200).json({ status: "success", data: mapTile });
});
