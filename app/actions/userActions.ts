'use server';
import { eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { userProfile } from '@/db/schema';
import type { UserProfileInsert } from '@/db/schema';

export const createUserProfile = async (data: UserProfileInsert) => {
  const result = await db
    .insert(userProfile)
    .values(data)
    .onConflictDoUpdate({
      target: [userProfile.userId],
      set: {
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        updatedAt: new Date(),
      },
    })
    .returning();
  return result[0];
};

export const getUserProfile = async (userId: string) => {
  const profile = await db.select().from(userProfile).where(eq(userProfile.userId, userId));
  return profile[0];
};
