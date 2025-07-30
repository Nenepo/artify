"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthImage from "@/components/AuthImage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { checkIfEmailExists } from "@/utility/utility";
import FormInput from "@/components/FormInput";
import SignupForm from "@/components/SignupForm";
import OTP from "@/components/OTP";
import { generateOTP, sendOtpToEmail } from "@/lib/otp";

function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail.includes("@") || normalizedEmail === "") {
      setError("Invalid email format.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    const exists = await checkIfEmailExists(normalizedEmail);
    if (exists) {
      setError("Email already registered. Try logging in.");
      setIsLoading(false);
      return;
    }

    try {
      const otpCode = generateOTP();
      await sendOtpToEmail(normalizedEmail, otpCode);
      setGeneratedOtp(otpCode);
      setCurrentScreen(2);
    } catch (err: any) {
      setError("Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerified = async () => {
    setIsLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase().trim(),
        password
      );

      await setDoc(doc(db, "users", userCred.user.uid), {
        email: email.toLowerCase().trim(),
        isVerified: true,
        createdAt: new Date(),
        verifiedAt: new Date(),
      });
      sessionStorage.removeItem("signupScreen");

      sessionStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } catch (err: any) {
      setError("Account creation failed. Try again.");
      setCurrentScreen(1);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const savedScreen = sessionStorage.getItem("signupScreen");
    if (savedScreen) {
      setCurrentScreen(parseInt(savedScreen));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("signupScreen", currentScreen.toString());

    if (currentScreen === 2) {
      // Scroll to top on OTP screen
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentScreen]);

  const screens = [
    {
      index: 1,
      screen: (
        <SignupForm
          email={email}
          changeInputValue={changeInputValue}
          continueToOtp={handleContinue}
          password={password}
          error={error}
          isLoading={isLoading}
        />
      ),
    },
    {
      index: 2,
      screen: (
        <OTP
          email={email}
          generatedOtp={generatedOtp}
          goBack={() => setCurrentScreen(1)}
          onVerified={handleVerified}
        />
      ),
    },
  ];

  // should slide up when we get to the otp screen, the otp screen should not scroll, only the imae should, center the otp on lare screen, still do not see the email
  return (
    <section className="bg-blue p-6 flex lg:gap-[70px] w-full h-screen overflow-y-auto scroll-bar ">
      <div className="lg:w-[50%] w-full overflow-y-auto scroll-bar ">
        <div className="sticky top-0 bg-blue">
          <Image src="/logo.png" width={76} height={47} alt="artify's logo" />
        </div>

        {screens.find((s) => s.index === currentScreen)?.screen}
      </div>
      <AuthImage />
    </section>
  );
}

export default Signup;
