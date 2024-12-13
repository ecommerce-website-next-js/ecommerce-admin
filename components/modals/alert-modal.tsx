"use client";

import { Modal } from "@/components/ui/modal";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <Modal
                title="Сигурен ли сте, искате да изтриете този магазин?"
                description="Тази операция не може да бъде отменена."
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                        disabled={loading}
                        variant={"outline"}
                        onClick={onClose}
                    >
                        Отказ
                    </Button>
                    <Button
                        disabled={loading}
                        variant={"destructive"}
                        onClick={onConfirm}
                    >
                        Продължи
                    </Button>
                </div>
            </Modal>
        </>
    );
};
