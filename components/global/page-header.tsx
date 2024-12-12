import Link from "next/link";

import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PageHeaderProps } from "@/types/global";
import React from "react";

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
    return (
        <>
            <h1 className="text-xl font-semibold mt-5">{title}</h1>
            <BreadcrumbList className="mt-2">
                {breadcrumbs?.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={item.href}>{item.name}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </>
    );
}