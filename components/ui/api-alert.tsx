"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import { toast } from "sonner";

export interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

export const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant }) => {

    const onCopy = (description: string) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(description)
                .then(() => {
                    console.log("Text copied successfully!");
                    toast.success("Копирано!");
                })
                .catch((error) => {
                    console.error("Failed to copy text: ", error);
                    toast.error("Неуспешно копиране!");
                });
        } else {
            console.warn("Clipboard API is not available");
            toast.success("Копирането не се поддържа на това устройство.");
        }
    }

    return (
        <Alert>
            <Server className="w-4 h-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.2rem]  py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button variant={"outline"} size={"icon"} onClick={() => onCopy(description)}>
                    <Copy className="w-4 h-4" />
                </Button>
            </AlertDescription>
        </Alert>
    );
}