import prisma from "@/lib/db";
import { isAuthenticated } from "@/utils/is-authenticated";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = await params;
        const user = await isAuthenticated();
        const body = await request.json();

        const { name } = body;

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prisma.store.updateMany({
            where: { id: parseInt(storeId), userId: user.id },
            data: { name }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORE_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = await params;
        const user = await isAuthenticated();

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prisma.store.deleteMany({
            where: { id: parseInt(storeId), userId: user.id }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORE_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
