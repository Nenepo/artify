"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Home = () => {
  const [splashScreen, setSplashScreen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Splash screen timer
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplashScreen(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Redirect if not logged in
useEffect(() => {
  if (!splashScreen && !loading && !user) {
    router.push("/login");
  }
}, [splashScreen, loading, user, router]);


  // Show splash while loading or during animation
  if (splashScreen || loading) {
    return <SplashScreen />;
  }

  // User is logged in
  return (
    <section>
      <h1>Welcome to the Home Page</h1>
    </section>
  );
};

export default Home;
