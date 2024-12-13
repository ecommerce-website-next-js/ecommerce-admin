import { redirect } from "next/navigation";

import { isAuthenticated } from "@/utils/is-authenticated";
import prisma from "@/lib/db";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    const { storeId } = await params;
    const id = parseInt(storeId) || null;
    const user = await isAuthenticated();

    if (!user) {
        return redirect("/");
    }

    if (!id) {
        return redirect("/");
    }

    const store = await prisma.store.findFirst({
        where: { id, userId: user.id },
    });

    if (!store) {
        return redirect("/");
    }

    return (
        <>
            {children}
        </>
    );
}
