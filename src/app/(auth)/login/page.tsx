import { Message } from '@/components/FormMessage';
import Login from '@/components/Login';

export default async function LoginPage({
    searchParams,
  }: {
    searchParams: Message
  }) {
    return (
        <Login message={searchParams}/>
    );
}
