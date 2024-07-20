"use client"
import { signIn, useSession } from "next-auth/react";
import React from "react";

function BusinessDetail() {
  const { data, status } = useSession();

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  if (status == "unauthenticated") {
    signIn("descope");
  }

  return <div>BusinessDetail</div>;
}

export default BusinessDetail;
