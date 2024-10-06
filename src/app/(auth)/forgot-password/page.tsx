'use client';

import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { useSearchParams } from "next/navigation";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const param = {};
  param['error'] = searchParams.get('error');
  param['success'] = searchParams.get('success');
  param['message'] = searchParams.get('message');
  return (
      <ForgotPasswordForm searchParams={param} />
  );
}
