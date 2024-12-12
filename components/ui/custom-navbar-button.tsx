import { CustomNavbarButtonProps } from "@/types/navbars";
import Link from "next/link";

export default function CustomNavbarButton({
    text,
    icon,
    href,
    listItemClasses,
    textClasses,
    linkClasses
}: CustomNavbarButtonProps) {
    return (
        <li className={listItemClasses}>
            <Link
                href={href}
                className={`flex items-center gap-2 font-semibold ${linkClasses}`}
                aria-label={text}
            >
                {icon && <span className="icon-container">{icon}</span>}
                <span className={textClasses}>{text}</span>
            </Link>
        </li>
    );
}