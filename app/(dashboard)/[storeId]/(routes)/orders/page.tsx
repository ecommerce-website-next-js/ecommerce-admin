import PageHeader from "@/components/global/page-header";
import { BreadcrumbProps } from "@/types/global";

export default function OrdersPage() {

    const breadcrumbs: BreadcrumbProps[] = [
        {
            href: "/",
            name: "Табло"
        },
        {
            href: "/orders",
            name: "Поръчки"
        }
    ];

    return (
        <>
            <PageHeader title="Поръчки" breadcrumbs={breadcrumbs} />
        </>
    );
}