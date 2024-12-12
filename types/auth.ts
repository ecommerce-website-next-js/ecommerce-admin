import * as z from "zod";

export const credentialsLoginSchema = z.object({
    email: z.string().email("Невалиден email"),
    password: z.string().min(8, "Паролата трябва да бъде поне 8 символа"),
    remember: z.string().optional(),
});

export interface CredentialLoginProps extends z.infer<typeof credentialsLoginSchema> {}

export const credentialsRegisterSchema = z.object({
    email: z.string().email("Невалиден email"),
    password: z.string().min(8, "Паролата трябва да бъде поне 8 символа"),
});

export interface CredentialRegisterProps extends z.infer<typeof credentialsRegisterSchema> {}
