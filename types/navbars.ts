import { Store } from "@prisma/client";
import { AnchorHTMLAttributes } from "react";

export interface CustomNavbarButtonProps
    extends AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
    icon?: React.ReactNode;
    href: string;
    listItemClasses?: string;
    textClasses?: string;
    linkClasses?: string;
}

export interface StoreSwitcherProps {
    className?: string;
    items: Store[];
}

export interface MobileNavbarProps {
    navbarButtons: CustomNavbarButtonProps[];
}
