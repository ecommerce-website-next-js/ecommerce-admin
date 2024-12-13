import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { IoMdGift } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";

import { CustomNavbarButtonProps } from "@/types/navbars";
import { DesktopNavbar } from "@/components/navigation/top-navbar/desktop-navbar";
import { MobileNavbar } from "@/components/navigation/top-navbar/mobile-navbar";
import { StoreSwitcher } from "./store-switcher";
import { StoreModalProps } from "@/types/store";

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

export default function TopNavbar() {
    const stores: StoreModalProps[] = [];

    return (
        <nav className="border-b border-gray-100 dark:bg-stone-900">
            <ul className="container mx-auto h-16 flex items-center justify-between gap-2 max-md:px-5">
                <div className="flex items-center gap-5">
                    <Link href={"/"} className="text-xl font-bold">
                        Админ
                    </Link>
                    <StoreSwitcher stores={stores} />
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
