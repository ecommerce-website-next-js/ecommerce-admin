import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner"
import TopNavbar from "@/components/navigation/top-navbar";

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
                <TopNavbar />
                <div className="container mx-auto max-md:px-5">
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    );
}
