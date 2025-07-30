"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const [hasChecked, setHasChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setHasChecked(true); // show SplashScreen first, then route

      // Delay the redirect slightly to ensure SplashScreen is visible
      setTimeout(() => {
        if (user) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      }, 1000); // 500ms to let the splash render before redirect
    });

    return () => unsubscribe();
  }, [router]);

  return <SplashScreen />;
}
