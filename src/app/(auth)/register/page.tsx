"use client"

import { Message } from "@/components/FormMessage";
import RegisterForm from "@/components/RegisterForm";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const param:Message = {};
  param['error'] = searchParams.get('error');
  param['success'] = searchParams.get('success');
  param['message'] = searchParams.get('message');

  return (
    <RegisterForm message={param}/>
  );
}
