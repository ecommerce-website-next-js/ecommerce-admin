import { redirect } from "next/navigation";

import { isAuthenticated } from "@/utils/is-authenticated";
import prisma from "@/lib/db";

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await isAuthenticated();

    if (!user) {
        redirect("/auth/login");
    }

    const store = await prisma.store.findFirst({ where: { userId: user.id } });

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <div>
            {children}
        </div>
    );
}
