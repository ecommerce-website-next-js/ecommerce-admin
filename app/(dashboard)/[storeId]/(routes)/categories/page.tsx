import PageHeader from "@/components/global/page-header";
import { BreadcrumbProps } from "@/types/global";

export default function CategoriesPage() {

    const breadcrumbs: BreadcrumbProps[] = [
        {
            href: "/",
            name: "Табло"
        },
        {
            href: "/categories",
            name: "Категории"
        }
    ];

    return (
        <>
            <PageHeader title="Категории" breadcrumbs={breadcrumbs} />
        </>
    );
}