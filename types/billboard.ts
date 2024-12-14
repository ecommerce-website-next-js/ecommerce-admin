import * as z from "zod";

import { Billboard } from "@prisma/client";

export interface BillboardFormProps {
    initialData: Billboard | null;
}

export const billboardFormSchema = z.object({
    label: z.string().min(1, "Това поле е задължително!"),
    imageUrl: z.string().optional(),
});

export type BillboardFormValues = z.infer<typeof billboardFormSchema>;