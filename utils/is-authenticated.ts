import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET не е дефиниран в .env файла.");
}

export async function isAuthenticated() {
    const auth = (await cookies()).get("auth");

    if (!auth) {
        return null;
    }

    const isValid = jwt.verify(auth.value, JWT_SECRET);

    if (!isValid) {
        return null;
    }

    const decoded = jwt.decode(auth.value, { json: true });

    if (!decoded) {
        return null;
    }

    return decoded;
}