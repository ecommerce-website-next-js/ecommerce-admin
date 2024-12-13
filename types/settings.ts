import * as z from "zod";

import { Store } from "@prisma/client";

export interface SettingsFormProps {
    initialData: Store;
}

export const settingsFormSchema = z.object({
    name: z.string().min(1, "Това поле е задължително!"),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
