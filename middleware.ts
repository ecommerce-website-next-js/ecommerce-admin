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
    const protectedRoutes = ["/dashboard"]; // Защитени маршрути
    const openRoutes = ["/auth/login", "/auth/register"]; // Отворени маршрути
    const { pathname } = request.nextUrl;

    const authToken = request.cookies.get("auth");

    console.log(authToken);
    

    // Проверка за отворени маршрути за логнати потребители
    if (openRoutes.some((route) => pathname.startsWith(route))) {
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

    // Проверка за защитени маршрути
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (authToken && authToken.value) {
            try {
                const decodedData = decodeJwt(authToken.value);

                if (!decodedData || decodedData?.role !== "ADMIN") {
                    return NextResponse.redirect(new URL("/", request.url));
                }
            } catch (error) {
                return NextResponse.redirect(new URL("/auth/login", request.url));
            }
        } else {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/auth/login",
        "/auth/register",
    ],
};
