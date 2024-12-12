"use server";

import { cookies } from "next/headers";

export async function createSession(name: string, value: any, expires: number) {
    const cookieStore = await cookies();
    cookieStore.set({
        name,
        value,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + expires),
    });

    return { success: !!getSession(name) }
}

export async function getSession(name: string) {
    const cookieStore = await cookies();
    const session = cookieStore.get(name);
    return session;
}

export async function deleteSession(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
    return { success: !!getSession(name) }
}