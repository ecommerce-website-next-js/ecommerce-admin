"use server";

import prisma from "@/lib/db";
import { createSession } from "@/lib/session";
import { ActionResult } from "@/types";
import { CredentialLoginProps } from "@/types/auth";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET не е дефиниран в .env файла.");
}

const expiresInMinutes = Number(process.env.AUTH_COOKIE_IN_MINUTES);
const expiresInDays = Number(process.env.AUTH_COOKIE_IN_DAYS);

if (isNaN(expiresInMinutes) || isNaN(expiresInDays)) {
    throw new Error("AUTH_COOKIE_IN_MINUTES или AUTH_COOKIE_IN_DAYS не са валидни числа.");
}

const expiresInMsMinutes = expiresInMinutes * 60 * 1000;
const expiresInMsDays = expiresInDays * 60 * 1000 * 24;

export default async function loginAction(data: CredentialLoginProps): Promise<ActionResult> {
    
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!user?.id) {
        return {
            success: false,
            message: "Имейл адресът или паролата са невалидни.",
        };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.hashedPassword);
    if (!isPasswordValid) {
        return {
            success: false,
            message: "Имейл адресът или паролата са невалидни.",
        };
    }

    const encryptedData = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(encryptedData, JWT_SECRET);

    const expires = data.remember ? expiresInMsDays : expiresInMsMinutes;
    await createSession("auth", token, expires);

    return redirect("/");
}