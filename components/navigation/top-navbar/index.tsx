import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { IoMdGift } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";

import { Store } from "@prisma/client";
import prisma from "@/lib/db";
import { CustomNavbarButtonProps } from "@/types/navbars";
import { DesktopNavbar } from "@/components/navigation/top-navbar/desktop-navbar";
import { MobileNavbar } from "@/components/navigation/top-navbar/mobile-navbar";
import { StoreSwitcher } from "@/components/navigation/top-navbar/store-switcher";
import { isAuthenticated } from "@/utils/is-authenticated";

const navbarButtons: CustomNavbarButtonProps[] = [
    {
        text: "Категории",
        href: "/categories",
        icon: <MdOutlineCategory size={24} />,
    },
    {
        text: "Поръчки",
        href: "/orders",
        icon: <CiBoxList size={24} />,
    },
    {
        text: "Продукти",
        href: "/products",
        icon: <IoMdGift size={24} />,
    },
    {
        text: "Акаунт",
        href: "/users/account",
        icon: <CiUser size={24} />,
    },
];

export default async function TopNavbar() {
    let stores: Store[] = [];
    const user = await isAuthenticated();

    if (user) {
        stores = await prisma.store.findMany({ where: { userId: user.id } });
    }

    return (
        <nav className="border-b border-gray-100 dark:bg-stone-900">
            <ul className="container mx-auto h-16 flex items-center justify-between gap-2 max-md:px-5">
                <div className="flex items-center gap-5">
                    <Link href={"/"} className="text-xl font-bold">
                        Админ
                    </Link>
                    <StoreSwitcher items={stores} />
                </div>

                <div className="hidden md:flex items-center justify-between gap-2">
                    <DesktopNavbar navbarButtons={navbarButtons} />
                </div>

                <div className="flex md:hidden flex-col gap-5">
                    <MobileNavbar navbarButtons={navbarButtons} />
                </div>
            </ul>
        </nav>
    );
}
