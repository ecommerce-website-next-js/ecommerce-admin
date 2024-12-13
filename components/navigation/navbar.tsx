import Link from "next/link";

import prisma from "@/lib/db";
import { Store } from "@prisma/client";

import { StoreSwitcher } from "@/components/navigation/components/store-switcher";
import { isAuthenticated } from "@/utils/is-authenticated";
import DisplayItems from "./components/display-items";

export default async function Navbar() {
    const user = await isAuthenticated();

    const stores: Store[] = user
        ? await prisma.store.findMany({ where: { userId: user.id } })
        : [];

    return (
        <nav className="border-b border-gray-100 dark:bg-stone-900">
            <ul className="container mx-auto h-16 flex items-center justify-between gap-2 max-md:px-5">
                <div className="flex items-center gap-5">
                    <Link href={"/"} className="text-xl font-bold">
                        Админ
                    </Link>
                    <StoreSwitcher items={stores} />
                </div>
                <DisplayItems />
            </ul>
        </nav>
    );
}