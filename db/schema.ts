import {
  integer,
  text,
  boolean,
  pgTable,
  serial,
  json,
  timestamp,
  pgEnum,
  uuid,
  varchar,
  index,
} from 'drizzle-orm/pg-core';
import type { InferModel } from 'drizzle-orm';

// Enums - define them first
export const StepType = pgEnum('step_type', ['game', 'video', 'trivia']);
export const RevealStatus = pgEnum('reveal_status', ['draft', 'active', 'completed']);
export const Gender = pgEnum('gender', ['boy', 'girl', 'twins_bb', 'twins_gg', 'twins_bg']);
export const GameType = pgEnum('game_type', ['puzzle', 'memory', 'quiz', 'countdown', 'scratch_card', 'balloon_pop']);
export const UserRevealRole = pgEnum('user_reveal_role', ['admin', 'viewer']);

// Templates
export const template = pgTable('template', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const templateStep = pgTable('template_step', {
  id: serial('id').primaryKey(),
  templateId: integer('template_id')
    .references(() => template.id)
    .notNull(),
  stepNumber: integer('step_number').notNull(),
  type: StepType('type').notNull(),
  config: json('config').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reveal = pgTable('reveal', {
  id: serial('id').primaryKey(),
  teamId: text('team_id').notNull(),
  templateId: integer('template_id')
    .references(() => template.id)
    .notNull(),
  status: RevealStatus('status').default('draft').notNull(),
  shareLink: uuid('share_link').defaultRandom().notNull(),
  settings: json('settings').notNull(),
  babyGender: Gender('baby_gender'),
  parentNames: json('parent_names').notNull(),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const revealStep = pgTable('reveal_step', {
  id: serial('id').primaryKey(),
  revealId: integer('reveal_id')
    .references(() => reveal.id)
    .notNull(),
  templateStepId: integer('template_step_id')
    .references(() => templateStep.id)
    .notNull(),
  stepNumber: integer('step_number').notNull(),
  customConfig: json('custom_config'),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const revealStats = pgTable('reveal_stats', {
  id: serial('id').primaryKey(),
  revealId: integer('reveal_id')
    .references(() => reveal.id)
    .notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  lastVisited: timestamp('last_visited').notNull(),
  stepsCompleted: integer('steps_completed').default(0).notNull(),
  timeSpent: integer('time_spent').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const gameTemplate = pgTable('game_template', {
  id: serial('id').primaryKey(),
  type: GameType('type').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  defaultConfig: json('default_config').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const game = pgTable('game', {
  id: serial('id').primaryKey(),
  revealStepId: integer('reveal_step_id')
    .references(() => revealStep.id)
    .notNull(),
  gameTemplateId: integer('game_template_id')
    .references(() => gameTemplate.id)
    .notNull(),
  config: json('config').notNull(),
  resultData: json('result_data'),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userProfile = pgTable('user_profile', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull().unique(),
  displayName: text('display_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userReveal = pgTable(
  'user_reveal',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    revealId: integer('reveal_id')
      .references(() => reveal.id)
      .notNull(),
    role: UserRevealRole('role').notNull(),
    invitedBy: varchar('invited_by', { length: 255 }).notNull(),
    inviteAccepted: boolean('invite_accepted').default(false).notNull(),
    lastAccessed: timestamp('last_accessed'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('user_reveal_user_id_idx').on(table.userId),
    revealIdIdx: index('user_reveal_reveal_id_idx').on(table.revealId),
  })
);

export const userGameProgress = pgTable('user_game_progress', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  gameId: integer('game_id')
    .references(() => game.id)
    .notNull(),
  progress: json('progress').notNull(),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Template = typeof template.$inferSelect;
export type TemplateInsert = typeof template.$inferInsert;

export type TemplateStep = typeof templateStep.$inferSelect;
export type TemplateStepInsert = typeof templateStep.$inferInsert;

export type Reveal = typeof reveal.$inferSelect;
export type RevealInsert = typeof reveal.$inferInsert;

export type RevealStep = typeof revealStep.$inferSelect;
export type RevealStepInsert = typeof revealStep.$inferInsert;

export type RevealStats = typeof revealStats.$inferSelect;
export type RevealStatsInsert = typeof revealStats.$inferInsert;

export type GameTemplate = typeof gameTemplate.$inferSelect;
export type GameTemplateInsert = typeof gameTemplate.$inferInsert;

export type Game = typeof game.$inferSelect;
export type GameInsert = typeof game.$inferInsert;

export type UserProfile = typeof userProfile.$inferSelect;
export type UserProfileInsert = typeof userProfile.$inferInsert;

export type UserReveal = typeof userReveal.$inferSelect;
export type UserRevealInsert = typeof userReveal.$inferInsert;

export type UserGameProgress = typeof userGameProgress.$inferSelect;
export type UserGameProgressInsert = typeof userGameProgress.$inferInsert;
