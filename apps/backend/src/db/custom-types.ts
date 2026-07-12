import { customType } from "drizzle-orm/pg-core";

// Custom type for PostGIS Point geometry
export const postgisPoint = customType<{ data: string }>({
  dataType() {
    return "geometry(Point, 4326)";
  },
  // When pulling data from the DB, return it as a string (WKT format, e.g., "POINT(-79.38 43.65)")
  fromDriver(value: unknown) {
    return value as string;
  },
  // When pushing to the DB, keep it as string
  toDriver(value: string) {
    return value;
  },
});

// Custom type for PostGIS LineString geometry
export const postgisLineString = customType<{ data: string }>({
  dataType() {
    return "geometry(LineString, 4326)";
  },
  fromDriver(value: unknown) {
    return value as string; // Returns Well-Known Text (WKT): "LINESTRING(lon1 lat1, lon2 lat2,...)"
  },
  toDriver(value: string) {
    return value;
  },
});
