"use client";

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BillboardFormProps, billboardFormSchema, BillboardFormValues } from "@/types/billboard";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { ImageUpload } from "@/components/ui/image-upload";

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData,
}) => {
    const [open, setOpen] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(billboardFormSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        },
    });

    const title = initialData ? "Актуализиране на билборд" : "Създаване на билборд";
    const description = initialData ? "Актуализиране на билборда" : "Добавяне на нов билборд";
    const toastMessage = initialData ? "Билбордът е актуализиран" : "Билбордът е добавен";
    const action = initialData ? "Запазване на промените" : "Създаване";

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            if (imagePath) data.imageUrl = imagePath;
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }
            router.refresh();
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Случи се неочаквана грешка.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            toast.success("Билбордът е изтрит.");
        } catch (error) {
            toast.error(
                "Уверете се, че първо сте премахнали всички, които използват този билборд."
            );
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 w-full"
                >
                    <div className="grid md:grid-cols-3 gap-5">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem className="col-span-3 md:col-span-3">
                                    <FormLabel>Етикет</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Етикет на билборда"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem className="col-span-3 md:col-span-3">
                                    <FormLabel>Изображение</FormLabel>
                                    <FormControl>
                                        <ImageUpload imagePath={imagePath} setImageUrl={setImagePath} />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                    </div>

                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/${params.storeId}`}
                variant="public"
            />
        </>
    );
};
