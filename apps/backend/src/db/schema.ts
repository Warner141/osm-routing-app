import {
  pgTable,
  integer,
  serial,
  real,
  text,
  doublePrecision,
  geometry,
  customType,
} from "drizzle-orm/pg-core";

// Stores the options that a tag could be, without repeats when multiple nodes have the same tag
export const tags = pgTable("tags", {
  id: serial().primaryKey(),
  key: text(),
  value: text(),
});

export const nodes = pgTable("nodes", {
  id: serial("id").primaryKey(),
  longitude: real("longitude"),
  latitude: real("latitude"),
  elevation: real("elevation"),
});

// Joins the node and tag tables by storing every relationship between each the nodes and tag
export const nodesToTags = pgTable("nodes_to_tags", {
  id: serial("id").primaryKey(),
  nodeId: integer("node_id")
    .references(() => nodes.id, { onDelete: "cascade" })
    .notNull(),
  tagId: integer("tag_id")
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
});

// Drizzle doesn't understand the postGIS LineString tag, so we make our own and tell drizzle how to convert it into a valid postgres request
export const LineString = customType<{ data: [x: number, y: number][] }>({
  dataType() {
    // 4326 is the standard GPS coordinate system (WGS84) used by OpenStreetMap
    return "geometry(LineString, 4326)";
  },
});

// Store only the smallest edges with each curve being made of several nodes
export const edges = pgTable("edges", {
  id: serial("id").primaryKey(),
  startNode: integer().references(() => nodes.id, { onDelete: "cascade" }),
  endNode: integer().references(() => nodes.id, { onDelete: "cascade" }),
  cost: doublePrecision(),
  reverseCost: doublePrecision("reverse_cost"),
  geometry: geometry(),
});
