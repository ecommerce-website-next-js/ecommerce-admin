import PageHeader from "@/components/global/page-header";
import { BreadcrumbProps } from "@/types/global";

export default async function UsersPage({
    params,
}: {
    params: { storeId: number };
}) {
    const storeId = (await params).storeId;
    const breadcrumbs: BreadcrumbProps[] = [
        {
            href: "/",
            name: "Табло",
        },
        {
            href: `/${storeId}/users`,
            name: "Потребители",
        },
    ];

    return (
        <>
            <PageHeader title="Потребители" breadcrumbs={breadcrumbs} />
        </>
    );
}
