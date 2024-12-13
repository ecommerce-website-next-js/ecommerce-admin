"use client";

import { usePathname } from "next/navigation";

import { CustomNavbarButtonProps } from "@/types/navbars";
import CustomNavbarButton from "@/components/ui/custom-navbar-button";

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
                    linkClasses={`py-2 px-1 rounded hover:text-blue-500 ${pathname === button.href && "text-blue-500"}`}
                />
            ))}
        </>
    );
}
