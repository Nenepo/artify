"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthImage from "@/components/AuthImage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail.includes("@")) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", normalizedEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No user found with this email. Redirecting to signup...");
        setTimeout(() => {
          router.push("/signup");
        }, 2000);
        return;
      }

      // check for user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );

      //  this is to check and get the token from the backend
      const idToken = await userCredential.user.getIdToken();

      await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      setLoading(false);
      router.push("/");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
      console.error(err.message);
    }
  };

  return (
    <section className="bg-blue  min-h-screen p-6 flex lg:gap-[70px] w-full    ">
      <div className="md:w-[40%] w-full">
        <Image src="/logo.png" width={76} height={47} alt="artify's logo" />

        {/* form */}
        <div className="w-full my-[124px]">
          <div className="flex flex-col gap-10 md:w-[507px] w-full ">
            <h2 className="font-bold text-white text-[28px] leading-[42px]">
              Welcome back
            </h2>

            <div className="flex flex-col gap-4">
              <SocialButtons icon="/apple_logo.png" text="Apple" />
              <SocialButtons icon="/google_icon.png" text="Google" />
              <SocialButtons icon="/facebook_icon.png" text="Facebook" />
            </div>

            <div className="flex items-center gap-6">
              <div className="w-full border-[0.5px] border-[#A6A6A6]"></div>
              <p className="text-white text-base">OR</p>
              <div className="w-full border-[0.5px] border-[#A6A6A6]"></div>
            </div>

            <form className="flex flex-col gap-10" onSubmit={login} noValidate>
              <div className="flex flex-col gap-6">
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Enter email here"
                  value={email}
                  onChange={changeInputValue}
                />
                <div className="flex flex-col gap-2">
                  <FormInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password here"
                    value={password}
                    onChange={changeInputValue}
                    isPassword
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                  />
                  <p className="text-start text-red-800 text-[10px] animate-pulse">
                    {error}
                  </p>
                </div>
                <Link
                  className="underline text-end text-white"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex gap-4 flex-col w-full">
                <button
                  type="submit"
                  disabled={email === "" || password === ""}
                  className={` rounded-2xl w-full h-12 border bg-gradient-to-b from-[#FDFDFF] to-[#989899] ${
                    email === "" || password === ""
                      ? "opacity-50 cursor-not-allowed "
                      : "cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="text-sm text-center text-white">
                  Don’t have an account?{" "}
                  <Link
                    className="underline  text-white font-bold"
                    href="/signup"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AuthImage />
    </section>
  );
}

export default LoginScreen;

const SocialButtons = ({
  icon,
  text,
  action,
}: {
  icon: string;
  text: string;
  action?: () => void;
}) => {
  return (
    <button
      className="px-4 py-2.5 bg-white/10 flex rounded-lg gap-4 items-center w-full h-12 justify-center cursor-pointer"
      onClick={action}
    >
      <Image src={icon} width={20} height={20} alt={`${text} icon`} />
      <span className="font-normal text-base text-white">{text}</span>
    </button>
  );
};

type FormInputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;
};

const FormInput = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  isPassword = false,
  showPassword = false,
  togglePassword,
}: FormInputProps) => {
  return (
    <div className="w-full flex flex-col gap-2 relative">
      <label htmlFor={name} className="capitalize text-white text-xs">
        {name}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-white/10 px-4 py-2.5 h-12 pr-10 flex items-center rounded-lg placeholder:text-base placeholder:text-grey text-white outline-none  border-0"
      />
      {isPassword && togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 bottom-6  cursor-pointer"
        >
          {showPassword ? (
            <EyeOff size={16} color="white" />
          ) : (
            <Eye size={16} color="black" />
          )}
        </button>
      )}
    </div>
  );
};
