import PageHeader from "@/components/global/page-header";
import { BreadcrumbProps, PageProps } from "@/types/global";

export default async function MyAccountPage({ params }: PageProps) {
    const storeId = (await params).storeId;
    const breadcrumbs: BreadcrumbProps[] = [
        {
            href: `/${storeId}`,
            name: "Табло"
        },
        {
            href: `/${storeId}/users`,
            name: "Потребители"
        },
        {
            href: `/${storeId}/users/account`,
            name: "Акаунт"
        }
    ];

    return (
        <>
            <PageHeader title="Моят акаунт" breadcrumbs={breadcrumbs} />
        </>
    );
}