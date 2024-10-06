'use client';

import Login from '@/components/Login';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
    const searchParams = useSearchParams();
    const param = {};
    param['error'] = searchParams.get('error');
    param['success'] = searchParams.get('success');
    param['message'] = searchParams.get('message');
    return (
        <Login searchParams={param}/>
    );
}
