import { z } from "zod";

export const questionSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(10).max(1000),
  tags: z.array(z.string().min(1).max(13)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer:z.string().min(10)
})