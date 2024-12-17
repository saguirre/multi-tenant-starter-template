"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { template, templateStep } from "@/db/schema";
import type { TemplateInsert, TemplateStepInsert } from "@/db/schema";

export const getTemplates = async () => {
  const templates = await db.select().from(template);
  return templates;
};

export const getTemplateWithSteps = async (templateId: number) => {
  const templateData = await db.select().from(template)
    .where(eq(template.id, templateId));
  const steps = await db.select().from(templateStep)
    .where(eq(templateStep.templateId, templateId));
  
  return { template: templateData[0], steps };
};

export const createTemplate = async (data: TemplateInsert) => {
  const result = await db.insert(template).values(data).returning();
  revalidatePath("/templates");
  return result[0];
};

export const addTemplateStep = async (data: TemplateStepInsert) => {
  const result = await db.insert(templateStep).values(data).returning();
  revalidatePath(`/templates/${data.templateId}`);
  return result[0];
};

export const updateTemplate = async (id: number, data: Partial<TemplateInsert>) => {
  await db.update(template)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(template.id, id));
  revalidatePath("/templates");
};

export const deleteTemplate = async (id: number) => {
  await db.delete(template).where(eq(template.id, id));
  revalidatePath("/templates");
}; 