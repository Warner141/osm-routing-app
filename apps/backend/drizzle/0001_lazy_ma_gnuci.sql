CREATE TABLE "edges" (
	"id" serial PRIMARY KEY NOT NULL,
	"startNode" integer,
	"endNode" integer,
	"cost" double precision,
	"reverse_cost" double precision,
	"geometry" geometry(point)
);
--> statement-breakpoint
CREATE TABLE "nodes" (
	"id" serial PRIMARY KEY NOT NULL,
	"longitude" real,
	"latitude" real,
	"elevation" real
);
--> statement-breakpoint
CREATE TABLE "nodes_to_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"node_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text,
	"value" text
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "edges" ADD CONSTRAINT "edges_startNode_nodes_id_fk" FOREIGN KEY ("startNode") REFERENCES "public"."nodes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "edges" ADD CONSTRAINT "edges_endNode_nodes_id_fk" FOREIGN KEY ("endNode") REFERENCES "public"."nodes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nodes_to_tags" ADD CONSTRAINT "nodes_to_tags_node_id_nodes_id_fk" FOREIGN KEY ("node_id") REFERENCES "public"."nodes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nodes_to_tags" ADD CONSTRAINT "nodes_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;