CREATE TYPE "public"."game_type" AS ENUM('puzzle', 'memory', 'quiz', 'countdown', 'scratch_card', 'balloon_pop');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('boy', 'girl', 'twins_bb', 'twins_gg', 'twins_bg');--> statement-breakpoint
CREATE TYPE "public"."reveal_status" AS ENUM('draft', 'active', 'completed');--> statement-breakpoint
CREATE TYPE "public"."step_type" AS ENUM('game', 'video', 'trivia');--> statement-breakpoint
CREATE TYPE "public"."user_reveal_role" AS ENUM('admin', 'viewer');--> statement-breakpoint
CREATE TABLE "game" (
	"id" serial PRIMARY KEY NOT NULL,
	"reveal_step_id" integer NOT NULL,
	"game_template_id" integer NOT NULL,
	"config" json NOT NULL,
	"result_data" json,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_template" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "game_type" NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"default_config" json NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reveal" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" text NOT NULL,
	"template_id" integer NOT NULL,
	"status" "reveal_status" DEFAULT 'draft' NOT NULL,
	"share_link" uuid DEFAULT gen_random_uuid() NOT NULL,
	"settings" json NOT NULL,
	"baby_gender" "gender",
	"parent_names" json NOT NULL,
	"due_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reveal_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"reveal_id" integer NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"last_visited" timestamp NOT NULL,
	"steps_completed" integer DEFAULT 0 NOT NULL,
	"time_spent" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reveal_step" (
	"id" serial PRIMARY KEY NOT NULL,
	"reveal_id" integer NOT NULL,
	"template_step_id" integer NOT NULL,
	"step_number" integer NOT NULL,
	"custom_config" json,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "template" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "template_step" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_id" integer NOT NULL,
	"step_number" integer NOT NULL,
	"type" "step_type" NOT NULL,
	"config" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_game_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"game_id" integer NOT NULL,
	"progress" json NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"display_name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_reveal" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"reveal_id" integer NOT NULL,
	"role" "user_reveal_role" NOT NULL,
	"invited_by" varchar(255) NOT NULL,
	"invite_accepted" boolean DEFAULT false NOT NULL,
	"last_accessed" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "game" ADD CONSTRAINT "game_reveal_step_id_reveal_step_id_fk" FOREIGN KEY ("reveal_step_id") REFERENCES "public"."reveal_step"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game" ADD CONSTRAINT "game_game_template_id_game_template_id_fk" FOREIGN KEY ("game_template_id") REFERENCES "public"."game_template"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reveal" ADD CONSTRAINT "reveal_template_id_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."template"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reveal_stats" ADD CONSTRAINT "reveal_stats_reveal_id_reveal_id_fk" FOREIGN KEY ("reveal_id") REFERENCES "public"."reveal"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reveal_step" ADD CONSTRAINT "reveal_step_reveal_id_reveal_id_fk" FOREIGN KEY ("reveal_id") REFERENCES "public"."reveal"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reveal_step" ADD CONSTRAINT "reveal_step_template_step_id_template_step_id_fk" FOREIGN KEY ("template_step_id") REFERENCES "public"."template_step"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "template_step" ADD CONSTRAINT "template_step_template_id_template_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."template"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_game_progress" ADD CONSTRAINT "user_game_progress_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_reveal" ADD CONSTRAINT "user_reveal_reveal_id_reveal_id_fk" FOREIGN KEY ("reveal_id") REFERENCES "public"."reveal"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_reveal_user_id_idx" ON "user_reveal" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_reveal_reveal_id_idx" ON "user_reveal" USING btree ("reveal_id");