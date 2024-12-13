import { redirect } from "next/navigation";

import prisma from "@/lib/db";
import { isAuthenticated } from "@/utils/is-authenticated";
import { PageProps } from "@/types/global";
import { SettingsForm } from "@/app/(dashboard)/[storeId]/(routes)/settings/components/settings-form";

const SettingsPage: React.FC<PageProps> = async ({ params }) => {
    const user = await isAuthenticated();
    const storeId = (await params).storeId.toString();

    if (!user || !storeId) {
        redirect("/auth/login");
    }

    const store = await prisma.store.findFirst({
        where: { id: parseInt(storeId), userId: parseInt(user.id) },
    });

    if (!store) {
        redirect("/auth/login");
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 pt-5">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
};

export default SettingsPage;
