"use client";

import { useParams } from "next/navigation";
import { BaggageClaim, LucideLayoutDashboard, Presentation, Settings, ShoppingBasket, StretchHorizontal, User, Users } from "lucide-react";

import { CustomNavbarButtonProps } from "@/types/navbars";
import { DesktopNavbar } from "@/components/navigation/components/desktop-navbar";
import { MobileNavbar } from "@/components/navigation/components/mobile-navbar";

export default function DisplayItems() {

    const params = useParams();
    const storeId = params.storeId;

    const navbarButtons: CustomNavbarButtonProps[] = [
        {
            text: "Преглед",
            href: `/${storeId}`,
            icon: <LucideLayoutDashboard size={24} />,
        },
        {
            text: "Настройки",
            href: `/${storeId}/settings`,
            icon: <Settings size={24} />,
        },
        {
            text: "Билбордове",
            href: `/${storeId}/billboards`,
            icon: <Presentation size={24} />,
        },
        {
            text: "Категории",
            href: `/${storeId}/categories`,
            icon: <StretchHorizontal size={24} />,
        },
        {
            text: "Поръчки",
            href: `/${storeId}/orders`,
            icon: <BaggageClaim size={24} />,
        },
        {
            text: "Продукти",
            href: `/${storeId}/products`,
            icon: <ShoppingBasket size={24} />,
        },
        {
            text: `Потребители`,
            href: `/${storeId}/users`,
            icon: <Users size={24} />,
        },
        {
            text: `Акаунт`,
            href: `/${storeId}/users/account`,
            icon: <User size={24} />,
        },
    ];

    return (
        <>
            <div className="hidden xl:flex items-center justify-between gap-2">
                <DesktopNavbar navbarButtons={navbarButtons} />
            </div>
            <div className="flex xl:hidden flex-col gap-5">
                <MobileNavbar navbarButtons={navbarButtons} />
            </div>
        </>
    );
}
