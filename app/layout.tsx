import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

import Navbar from "@/components/navigation/navbar";
import { ModalProvider } from "@/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

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
                    <EdgeStoreProvider>{children}</EdgeStoreProvider>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
