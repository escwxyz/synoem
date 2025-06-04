import type { z } from "zod";

export type FormStep<T extends z.ZodSchema> = {
  id: string;
  title?: string;
  description?: string;
  schema: T;
  component: React.ReactNode;
};
