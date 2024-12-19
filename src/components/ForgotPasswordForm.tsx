
import { forgotPasswordAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitButton } from "./ui/submit-button";
import { FormMessage } from "./FormMessage";
import { Message } from "@/types";

export default function ForgotPasswordForm ({ message }: { message: Message }) {
    return (
        <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
            <div>
            <h1 className="text-2xl font-medium">Reset Password</h1>
            <p className="text-sm text-secondary-foreground">
                Already have an account?{" "}
                <Link className="text-primary underline" href="/register">
                Register
                </Link>
            </p>
            </div>
            <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <SubmitButton formAction={forgotPasswordAction} pendingText="Resetting password...">
                Reset Password
            </SubmitButton>
            <FormMessage message={message}/>
            </div>
        </form>
    )
}