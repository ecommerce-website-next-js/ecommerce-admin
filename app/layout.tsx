import type { Metadata } from "next";
import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}
