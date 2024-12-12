import PageHeader from "@/components/global/page-header";
import { BreadcrumbProps } from "@/types/global";

export default function MyAccountPage() {

    const breadcrumbs: BreadcrumbProps[] = [
        {
            href: "/",
            name: "Табло"
        },
        {
            href: "/users",
            name: "Потребители"
        },
        {
            href: "/users/account",
            name: "Акаунт"
        }
    ];

    return (
        <>
            <PageHeader title="Моят акаунт" breadcrumbs={breadcrumbs} />
        </>
    );
}