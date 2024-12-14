import prisma from "@/lib/db";
import { BillboardForm } from "./billboard-form";

export default async function BillboardPage({
    params,
}: {
    params: { billboardId: string };
}) {
    const { billboardId } = await params;

    const billboard = await prisma.billboard.findUnique({
        where: { id: billboardId },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
}