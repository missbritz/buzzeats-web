"use client"

import RegisterForm from "@/components/RegisterForm";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const param = {};
  param['error'] = searchParams.get('error');
  param['success'] = searchParams.get('success');
  param['message'] = searchParams.get('message');

  return (
    <RegisterForm searchParams={param}/>

  );
}
