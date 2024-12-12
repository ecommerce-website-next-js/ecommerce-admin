import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CredentialsRegister from "@/components/auth/credentials-register";

export default async function RegisterPage() {

    const session = await auth()

    if (session) {
        return redirect("/");
    }

    return (
        <>
            <CredentialsRegister />
        </>
    );
}
