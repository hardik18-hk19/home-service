"use client";

import { useDescope } from "@descope/react-sdk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user } = useDescope();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/"); // ✅ Redirect to home if logged in
    }
  }, [user, router]);

  return <div>Login Page</div>;
}
