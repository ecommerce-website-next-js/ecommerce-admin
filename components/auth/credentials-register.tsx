"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CredentialRegisterProps, credentialsRegisterSchema } from "@/types/auth";

import registerAction from "@/actions/auth/register";
import { ActionResult } from "@/types";
import { toast } from "sonner";

export default function CredentialsLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CredentialRegisterProps>({
        resolver: zodResolver(credentialsRegisterSchema),
    });

    const onSubmit: SubmitHandler<CredentialRegisterProps> = async (data: CredentialRegisterProps) => {
        const result: ActionResult = await registerAction(data);

        if (!result.success) {
            return toast.error(result.message, { position: "bottom-right" });
        }
    };

    return (
        <Card className="max-w-md mx-auto border my-10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Създаване на нов профил
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <Label>Имейл Адрес *</Label>
                        <Input {...register("email")} disabled={isSubmitting} />
                        {errors.email && (
                            <div className="text-red-500">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <Label>Парола *</Label>
                        <Input
                            type="password"
                            {...register("password")}
                            disabled={isSubmitting}
                        />
                        {errors.password && (
                            <div className="text-red-500">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <div>
                        <Button type="submit" disabled={isSubmitting}>
                            {!isSubmitting ? "Регистрация" : "Създаване на профила..."}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
