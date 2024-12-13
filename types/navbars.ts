import { AnchorHTMLAttributes } from "react";
import { StoreModalProps } from "./store";

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
    stores: StoreModalProps[];
}

export interface MobileNavbarProps {
    navbarButtons: CustomNavbarButtonProps[];
}