"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Card } from "./card";

interface ImageUploadProps {
    setImageUrl: (imageUrl: string) => void;
    imagePath: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    setImageUrl,
    imagePath,
}: ImageUploadProps) => {
    const [progress, setProgress] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");

    const onUpload = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Файлът не е изображение.");
            return;
        }

        toast.info("Качването започна...");
        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        setFileName(file.name);

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progressPercent = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );

                        setProgress(progressPercent);
                    }
                },
            });

            if (response.status === 200 && response.data.path) {
                toast.success("Качването завърши успешно!");
                setImageUrl(response.data.path);
            } else {
                toast.error("Грешка при качване на файла.");
            }

            setLoading(false);
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Грешка при качване на файла.");
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-md">
            <Input
                type="file"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        onUpload(e.target.files[0]);
                    }
                }}
                aria-label="Избери файл за качване"
            />
            <div className="flex flex-col gap-2">
                <Progress value={progress} max={100} className="h-4" />
                <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            {fileName && (
                <div className="text-xs text-gray-500">Файл: {fileName}</div>
            )}
            {(imagePath && !loading) && (
                <Card className="w-[200px] h-[200px]">
                    <Image
                        src={`/uploads/billboards${imagePath}`}
                        alt="Image"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        priority
                    />
                </Card>
            )}
        </div>
    );
};