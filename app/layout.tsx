import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/navigation/navbar";
import { ModalProvider } from "@/providers/modal-provider";

export const metadata: Metadata = {
    title: "Административно Табло",
    description: "Административно Табло",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bg">
            <body>
                <Navbar />
                <div className="container mx-auto max-md:px-5">
                    <ModalProvider />
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    );
}
