"use server";

import prisma from "@/lib/db";
import { ActionResult } from "@/types";
import { StoreModalProps } from "@/types/store";
import { isAuthenticated } from "@/utils/is-authenticated";

export default async function createStoreAction(
    data: StoreModalProps
): Promise<ActionResult> {
    const user = await isAuthenticated();

    if (!user) {
        return { success: false, message: "Нямате достъп до тази функционалност." };
    }

    const store = await prisma.store.findFirst({
        where: { AND: [{ name: data.name }, { userId: user.id }] },
    });

    if (store) {
        return { success: false, message: "Имате магазин с това име." };
    }

    const createdStore = await prisma.store.create({
        data: { name: data.name, userId: user.id },
    });

    return { success: true, message: "Магазинът беше създаден успешно.", data: createdStore.id };
}