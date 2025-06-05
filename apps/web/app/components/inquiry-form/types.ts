import type { z, ZodTypeAny } from "zod";

export type FormStep<T extends ZodTypeAny = ZodTypeAny> = {
  id: string;
  title?: string;
  description?: string;
  schema: T;
  component: React.ReactNode;
};
