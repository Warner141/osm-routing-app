import { LineString } from "geojson";

export interface EdgeGeometry {
  geom: LineString;
  streetName: string | null;
}
