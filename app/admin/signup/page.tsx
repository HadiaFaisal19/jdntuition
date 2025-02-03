// app/admin/signup/page.tsx
"use client";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/dashboard");
  };

  const handleCancel = () => {
    router.push("/admin/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <SignupForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
}