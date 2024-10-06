import { Message } from "@/components/FormMessage";
import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Message
}) {
  return (
    <RegisterForm message={searchParams}/>
  );
}
