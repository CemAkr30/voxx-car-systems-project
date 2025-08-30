import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().optional(),
  VITE_APP_NAME: z.string().optional(),
});

const env = envSchema.parse(import.meta.env);

export default env;
