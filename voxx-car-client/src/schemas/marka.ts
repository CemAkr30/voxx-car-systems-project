import { z } from "zod";

export const markaCreateSchema = z.object({
  adi: z.string().min(1, "Marka adı gereklidir"),
});
