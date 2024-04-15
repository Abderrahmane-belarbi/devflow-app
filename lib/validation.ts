import { z } from "zod";

export const questionSchema = z.object({
    title: z.string().min(5).max(130),
    explanation: z.string().min(10).max(1000),
    tags: z.array(z.string().min(2).max(20)).min(1).max(5)
  });