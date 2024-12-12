"use client";

import Link from "next/link";

import { CiUser } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { IoMdGift } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import CustomNavbarButton from "@/components/ui/custom-navbar-button";
import { CustomNavbarButtonProps } from "@/types/navbars";
import { useState } from "react";
import { usePathname } from "next/navigation";

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
    return (
        <nav className="bg-gray-100 dark:bg-stone-900">
            <ul className="container mx-auto h-16 flex items-center justify-between gap-2 max-md:px-5">
                <Link href={"/"} className="text-xl font-bold">
                    Админ
                </Link>

                <div className="hidden md:flex items-center justify-between gap-2">
                    <DesktopNavbar navbarButtons={navbarButtons} />
                </div>

                <div className="flex md:hidden flex-col gap-5">
                    <MobileNavbar />
                </div>
            </ul>
        </nav>
    );
}

export function DesktopNavbar({
    navbarButtons,
}: {
    navbarButtons: CustomNavbarButtonProps[];
}) {

    const pathname = usePathname();
    
    return (
        <>
            {navbarButtons.map((button, index) => (
                <CustomNavbarButton
                    key={index}
                    text={button.text}
                    href={button.href}
                    icon={button.icon}
                    linkClasses={`py-2 px-3 rounded hover:text-gray-100 hover:bg-blue-500 ${pathname === button.href && "text-gray-100 bg-blue-600 shadow"}`}
                />
            ))}
        </>
    );
}

export function MobileNavbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger onClick={() => setIsOpen(true)} asChild>
                <CiMenuBurger className="cursor-pointer" size={24} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Навигация</SheetTitle>
                    <SheetDescription
                        className="w-full flex flex-col"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        {navbarButtons.map((button, index) => (
                            <CustomNavbarButton
                                listItemClasses="px-2 w-full block rounded"
                                linkClasses={`py-3 px-4 rounded hover:text-gray-100 hover:bg-blue-500 ${pathname === button.href && "text-gray-100 bg-blue-600 shadow"}`}
                                key={index}
                                text={button.text}
                                href={button.href}
                                icon={button.icon}
                            />
                        ))}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}