import PageHeader from "@/components/global/page-header";
import { BreadcrumbProps } from "@/types/global";

export default function ProductsPage() {

    const breadcrumbs: BreadcrumbProps[] = [
        {
            href: "/",
            name: "Табло"
        },
        {
            href: "/products",
            name: "Продукти"
        }
    ];

    return (
        <>
            <PageHeader title="Продукти" breadcrumbs={breadcrumbs} />
        </>
    );
}