"use client";

import { AuthProvider } from "@descope/react-sdk"; // Correct package

export default function Providers({ children }) {
  return (
    <AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID}>
      {children}
    </AuthProvider>
  );
}
