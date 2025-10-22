// validations/quizSchema.ts
import { z } from "zod";

export const optionSchema = z.object({
  text: z.string().min(1),
  isCorrect: z.boolean().optional().default(false),
});

export const questionSchema = z.object({
  text: z.string().min(1),
  type: z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]),
  correctAnswer: z.string().optional(),
  options: z.array(optionSchema).min(1),
});

export const createQuizSchema = z.object({
  title: z.string().min(1),
  questions: z.array(questionSchema).min(1),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
