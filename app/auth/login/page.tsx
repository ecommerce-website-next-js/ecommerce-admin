import { redirect } from "next/navigation";

import { auth } from "@/auth";
import SocialLogin from "@/components/auth/social-login";
import CredentialsLogin from "@/components/auth/credentials-login";

export default async function LoginPage() {

    const session = await auth()

    if (session) {
        return redirect("/");
    }

    return (
        <>
            <CredentialsLogin />
            <SocialLogin />
        </>
    );
}
