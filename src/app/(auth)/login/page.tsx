'use client';

import { Message } from '@/components/FormMessage';
import Login from '@/components/Login';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
    const searchParams = useSearchParams();
    const param:Message = {};
    param['error'] = searchParams.get('error');
    param['success'] = searchParams.get('success');
    param['message'] = searchParams.get('message');
    return (
        <Login message={param}/>
    );
}
