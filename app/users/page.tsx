import PageHeader from "@/components/global/page-header";
import { BreadcrumbProps } from "@/types/global";

export default function UsersPage() {

    const breadcrumbs: BreadcrumbProps[] = [
        {
            href: "/",
            name: "Табло"
        },
        {
            href: "/users",
            name: "Потребители"
        },
    ];

    return (
        <>
            <PageHeader title="Потребители" breadcrumbs={breadcrumbs} />
        </>
    );
}