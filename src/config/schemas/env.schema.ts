import z from "zod";
import { baseSchema } from "./base.schema";

export const envSchema = baseSchema

export type envConfig = z.infer<typeof envSchema>

export const validate = (config: Record<string, any>) => {
  const { data, success, error } = envSchema.safeParse(config);
  if (!success) {
    throw new Error(`Env validation failed \n${z.prettifyError(error)}`);
  }
  return data;
};
