import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJwt(token: string) {
    const base64Url = token.split(".")[1]; // Payload е втората част
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );
    return JSON.parse(jsonPayload);
}

export function middleware(request: NextRequest) {
    const publicRoutes = ["/auth/login", "/auth/register"];
    const { pathname } = request.nextUrl;

    const authToken = request.cookies.get("auth");

    // Публични маршрути: достъпни само за нелогнати потребители
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
        if (authToken && authToken.value) {
            try {
                const decodedData = decodeJwt(authToken.value);

                if (decodedData) {
                    return NextResponse.redirect(new URL("/", request.url));
                }
            } catch (error) {
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    // Всички останали маршрути: достъпни само за логнати администратори
    if (authToken && authToken.value) {
        try {
            const decodedData = decodeJwt(authToken.value);

            if (decodedData?.role === "ADMIN") {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL("/", request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    } else {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: [
        "/((?!auth/login|auth/register|_next|static).*)"
    ],
};