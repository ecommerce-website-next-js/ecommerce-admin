import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SocialLogin() {
    return (
        <>
            <form
                className="text-center"
                action={async () => {
                    "use server";
                    await signIn("google");
                }}
            >
                <Button type="submit">Вход с Google</Button>
            </form>
        </>
    );
}
