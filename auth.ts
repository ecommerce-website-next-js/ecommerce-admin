import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { saltAndHashPassword } from "@/utils/password";
import prisma from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                const hashedPassword = await saltAndHashPassword(
                    credentials.password as string
                );

                user = await prisma.user.findFirst({
                    where: {
                        AND: [
                            { email: credentials.email as string },
                            { hashedPassword },
                        ],
                    },
                });

                if (!user) {
                    throw new Error("Invalid credentials.");
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    image: user.image,
                    name: undefined,
                };
            },
        }),
    ],
});
