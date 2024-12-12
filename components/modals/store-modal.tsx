"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { storeModalSchema, StoreModalProps } from "@/types/store";
import { Label } from "@/components/ui/label";
import createStoreAction from "@/actions/stores/create";

export const StoreModal = () => {
    const router = useRouter();
    const storeModal = useStoreModal();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<StoreModalProps>({
        resolver: zodResolver(storeModalSchema),
    });

    const onSubmit = async (values: StoreModalProps) => {
        try {
            const result = await createStoreAction(values);

            if (!result.success) {
                return toast.error(result.message);
            }

            toast.success(result.message);
            storeModal.onClose();
            router.push(`/${result.data}`);
        } catch (error) {
            return toast.error("Неочаквана грешка!");
        }
    };

    return (
        <Modal
            title="Създаване на магазин"
            description="Добавете нов магазин, за да управлявате продукти и категории."
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5"
                    >
                        <div>
                            <Label>Име *</Label>
                            <Input
                                {...register("name")}
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={isSubmitting}>
                                {!isSubmitting ? "Приложи" : "Създаване..."}
                            </Button>
                            <Button
                                type="button"
                                variant={"outline"}
                                onClick={storeModal.onClose}
                            >
                                Отказ
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};
