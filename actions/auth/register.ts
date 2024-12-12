"use server";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

import prisma from "@/lib/db";
import { createSession } from "@/lib/session";
import { CredentialRegisterProps } from "@/types/auth";
import { ActionResult } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
const expiresInDays =
    Number(process.env.AUTH_COOKIE_IN_DAYS) * 60 * 1000 * 24 * 30;

export default async function loginAction(data: CredentialRegisterProps): Promise<ActionResult> {
    const totalUsersCount = await prisma.users.count();
    const user = await prisma.users.findUnique({
        where: { email: data.email },
    });

    if (user) {
        return { success: false, message: "Този имейл адрес е зает!" };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

    const createdUser = await prisma.users.create({
        data: {
            email: data.email,
            hashedPassword,
            role: totalUsersCount === 0 ? "ADMIN" : "USER",
        },
    });

    const encryptedData = {
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
    };
    const token = jwt.sign(encryptedData, JWT_SECRET);

    await createSession("auth", token, expiresInDays);
    return redirect("/");
}
