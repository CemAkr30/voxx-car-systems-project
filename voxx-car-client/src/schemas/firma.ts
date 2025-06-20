import {z} from "zod";

export const firmaCreateSchema = z.object({
    unvan: z.string().min(1, "Firma unvanı gereklidir"),
    email: z.string().min(1, "Firma emaili gereklidir"),
    vergiNo: z.string().min(1, "Firma vergi no'su gereklidir"),
});
export type CreateFirmaRequest = z.infer<typeof firmaCreateSchema>;

export const firmaUpdateSchema = firmaCreateSchema.extend({
    id: z.string(),
    unvan: z.string(),
    email: z.string(),
    vergiNo: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().optional(),
});
export type Firma = z.infer<typeof firmaUpdateSchema>;

/* private String email;
    private String unvan;
    private String vergiNo;*/