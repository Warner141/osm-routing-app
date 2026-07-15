import { customType } from "drizzle-orm/pg-core";
import { Geometry } from "wkx";
import type { Point, LineString } from "geojson";

const SRID = process.env.SRID || "4326";

function parseGeoJSONToWKT(geojson: any): string {
  return `SRID=${SRID};${Geometry.parseGeoJSON(geojson).toWkt()}`;
}

function parseHexToGeoJSON<type>(hexValue: unknown): type {
  if (typeof hexValue === "string") {
    const buffer = Buffer.from(hexValue, "hex");

    return Geometry.parse(buffer).toGeoJSON() as type;
  }
  return hexValue as type;
}

// Custom type for PostGIS Point geometry
export const postgisPoint = customType<{ data: Point }>({
  dataType() {
    return `geometry(Point, ${SRID})`;
  },
  fromDriver(value: unknown) {
    return parseHexToGeoJSON<Point>(value);
  },
  toDriver(value: Point) {
    return parseGeoJSONToWKT(value);
  },
});

// Custom type for PostGIS LineString geometry
export const postgisLineString = customType<{ data: LineString }>({
  dataType() {
    return `geometry(LineString, ${SRID})`;
  },
  fromDriver(value: unknown) {
    return parseHexToGeoJSON<LineString>(value);
  },
  toDriver(value: LineString) {
    return parseGeoJSONToWKT(value);
  },
});
