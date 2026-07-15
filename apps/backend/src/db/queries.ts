import { sql } from "drizzle-orm";
import { edges } from "./schema.js";
import { db } from "./db-init.js";

const TILE_SIZE = 4096;
const TILE_BUFFER = 64;

interface TileEnvelope {
  x: number;
  y: number;
  z: number;
}

export async function findMapTile(
  { z, x, y }: TileEnvelope,
  layerName: string = "edges",
): Promise<Buffer> {
  const envelope = sql`ST_TileEnvelope(${z}, ${x}, ${y})`;

  const tileSubquery = db
    .select({
      streetName: edges.streetName,
      geom: sql`ST_AsMVTGeom(${edges.geom}, ${envelope}, ${TILE_SIZE}, ${TILE_BUFFER}, true)`.as(
        "geom",
      ),
    })
    .from(edges)
    .where(sql`${edges.geom} && ${envelope}`)
    .as("tile");

  const tileAsMVT = await db
    .select({
      mvt: sql<Buffer | string>`ST_AsMVT(${tileSubquery}.*, ${layerName})`,
    })
    .from(tileSubquery);

  const rawMvt = tileAsMVT[0]?.mvt;

  if (!rawMvt) return Buffer.alloc(0);

  const mvtBuffer = typeof rawMvt === "string" ? Buffer.from(rawMvt, "hex") : rawMvt;

  return mvtBuffer;
}
