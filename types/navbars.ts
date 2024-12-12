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
