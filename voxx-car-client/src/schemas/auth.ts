import { z } from "zod";

export const loginSchema = z.object({
  kullaniciAdi: z.string().min(1, "Username is required"),
  parola: z.string().min(1, "Password is required"),
});
