"use client";

import React, { useEffect } from "react";
import CalloutErrorMessage from "./CalloutErrorMessage";
import { useRouter } from "next/navigation";

const AccessDeny = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(async () => {
      router.push("/questions/list");
      router.refresh();
    }, 1500);
  }, [router]);

  return (
    <CalloutErrorMessage>
      Access Denied. Redirecting to Question List.
    </CalloutErrorMessage>
  );
};

export default AccessDeny;
