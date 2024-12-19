import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { SubmitButton } from "./ui/submit-button";
import { FormMessage } from "./FormMessage";
import { resetPasswordAction } from "@/actions";
import { Message } from "@/types";

export default function ResetPasswordForm ({ message }: { message: Message }) {
    return (
        <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">Reset password</h1>
            <p className="text-sm text-foreground/60">
            Please enter your new password below.
            </p>
            <Label htmlFor="password">New password</Label>
            <Input
            type="password"
            name="password"
            placeholder="New password"
            required
            />
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            />
            <SubmitButton formAction={resetPasswordAction}>
            Reset password
            </SubmitButton>
            <FormMessage message={message} />
        </form>
    )
}