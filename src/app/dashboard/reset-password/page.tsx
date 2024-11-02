import { Message } from '../../../types'
import ResetPasswordForm from "@/components/ResetPassword";

export default async function ResetPassword({
    searchParams,
  }: {
    searchParams: Message
  }) {
    return (
        <ResetPasswordForm message={searchParams}/>
    );
}
