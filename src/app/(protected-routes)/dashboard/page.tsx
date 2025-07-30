"use client"

import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth"; // If you're using firebase client-side
import { auth } from "@/lib/firebase"; // Adjust this import based on your setup
import React from "react";

function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    await signOut(auth); // optional
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <button onClick={handleLogout}>Logout</button>
    </ProtectedRoute>
  );
}

export default Dashboard;
