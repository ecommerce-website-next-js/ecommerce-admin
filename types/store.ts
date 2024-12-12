import * as z from "zod";

export const storeModalSchema = z.object({
    name: z.string().min(1, "Това поле е задължително!").default(""),
});

export interface StoreModalProps extends z.infer<typeof storeModalSchema> {}