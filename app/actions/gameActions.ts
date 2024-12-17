'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/drizzle';
import { game, gameTemplate, userGameProgress } from '@/db/schema';
import type { GameInsert, GameTemplateInsert, UserGameProgressInsert } from '@/db/schema';

export const getGameTemplates = async () => {
  const templates = await db.select().from(gameTemplate);
  return templates;
};

export const createGame = async (data: GameInsert) => {
  const result = await db.insert(game).values(data).returning();
  revalidatePath(`/reveals/${data.revealStepId}`);
  return result[0];
};

export const updateGameProgress = async (data: UserGameProgressInsert) => {
  const result = await db
    .insert(userGameProgress)
    .values(data)
    .onConflictDoUpdate({
      target: [userGameProgress.userId, userGameProgress.gameId],
      set: {
        progress: data.progress,
        completed: data.completed,
        completedAt: data.completed ? new Date() : null,
        updatedAt: new Date(),
      },
    })
    .returning();

  revalidatePath(`/games/${data.gameId}`);
  return result[0];
};

export const getGameWithProgress = async (gameId: number, userId: string) => {
  const gameData = await db.select().from(game).where(eq(game.id, gameId));

  const progress = await db
    .select()
    .from(userGameProgress)
    .where(eq(userGameProgress.gameId, gameId) && eq(userGameProgress.userId, userId));

  return {
    game: gameData[0],
    progress: progress[0],
  };
};
