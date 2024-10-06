import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { Message } from "@/components/FormMessage";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Message
}) {
  return (
      <ForgotPasswordForm message={searchParams} />
  );
}
