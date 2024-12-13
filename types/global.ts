export type PageHeaderProps = {
    title: string;
    breadcrumbs: BreadcrumbProps[];
}

export type BreadcrumbProps = {
    href: string;
    name: string;
}

export interface HeadingProps {
    title: string;
    description: string;
}

export interface PageProps {
    params: {
        storeId: number;
    }
}