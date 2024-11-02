import { Message } from "@/types";

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {message?.success ? (
        <div className="p-5 text-green-700 font-bold">
          {message.success}
        </div>
      ) : ''}
      {message?.error ? (
        <div className="p-5 text-red-700 font-bold">
          {message.error}
        </div>
      ): ''}
      {message?.message ? (
        <div className="p-5 font-bold">{message.message}</div>
      ) : ''}
    </div>
  );
}