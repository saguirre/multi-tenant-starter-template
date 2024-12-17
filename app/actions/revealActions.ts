'use server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/drizzle';
import { reveal, revealStep, revealStats, userReveal } from '@/db/schema';
import type { RevealInsert, RevealStepInsert, RevealStatsInsert, UserRevealInsert } from '@/db/schema';

export const createReveal = async (data: RevealInsert) => {
  const result = await db.insert(reveal).values(data).returning();
  revalidatePath(`/reveals/${result[0].id}`);
  return result[0];
};

export const updateRevealStatus = async (revealId: number, status: 'draft' | 'active' | 'completed') => {
  await db
    .update(reveal)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(reveal.id, revealId));
  revalidatePath(`/reveals/${revealId}`);
};

export const getRevealWithSteps = async (revealId: number) => {
  const revealData = await db.select().from(reveal).where(eq(reveal.id, revealId));

  const steps = await db.select().from(revealStep).where(eq(revealStep.revealId, revealId));

  return { reveal: revealData[0], steps };
};

export const createRevealStep = async (data: RevealStepInsert) => {
  const result = await db.insert(revealStep).values(data).returning();
  revalidatePath(`/reveals/${data.revealId}`);
  return result[0];
};

export const updateRevealStep = async (stepId: number, customConfig: any, completed: boolean) => {
  await db
    .update(revealStep)
    .set({
      customConfig,
      completed,
      updatedAt: new Date(),
    })
    .where(eq(revealStep.id, stepId));
};

export const updateRevealStats = async (data: RevealStatsInsert) => {
  const result = await db
    .insert(revealStats)
    .values(data)
    .onConflictDoUpdate({
      target: [revealStats.revealId, revealStats.userId],
      set: {
        lastVisited: new Date(),
        stepsCompleted: data.stepsCompleted,
        timeSpent: data.timeSpent,
        updatedAt: new Date(),
      },
    })
    .returning();
  return result[0];
};

export const addUserToReveal = async (data: UserRevealInsert) => {
  const result = await db.insert(userReveal).values(data).returning();
  revalidatePath(`/reveals/${data.revealId}`);
  return result[0];
};

export const updateUserRevealAccess = async (userId: string, revealId: number) => {
  await db
    .update(userReveal)
    .set({
      lastAccessed: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(userReveal.userId, userId) && eq(userReveal.revealId, revealId));
};

export const acceptRevealInvite = async (userId: string, revealId: number) => {
  await db
    .update(userReveal)
    .set({
      inviteAccepted: true,
      updatedAt: new Date(),
    })
    .where(eq(userReveal.userId, userId) && eq(userReveal.revealId, revealId));

  revalidatePath(`/reveals/${revealId}`);
};
