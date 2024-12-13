"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import CustomNavbarButton from "@/components/ui/custom-navbar-button";
import { MobileNavbarProps } from "@/types/navbars";

export function MobileNavbar({ navbarButtons }: MobileNavbarProps) {
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