ALTER TABLE "public"."game_template" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."game_type";--> statement-breakpoint
CREATE TYPE "public"."game_type" AS ENUM('puzzle', 'memory', 'quiz', 'countdown', 'scratch_card', 'arcade');--> statement-breakpoint
ALTER TABLE "public"."game_template" ALTER COLUMN "type" SET DATA TYPE "public"."game_type" USING "type"::"public"."game_type";