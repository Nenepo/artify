import React, { useState } from "react";
import SocialButtons from "./SocialButtons";
import FormInput from "./FormInput";
import Link from "next/link";

type SignupProps = {
  continueToOtp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  email: string;
  changeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  error: string;
  isLoading: boolean;
};

function SignupForm({
  email,
  changeInputValue,
  password,
  error,
  isLoading,
  continueToOtp,
}: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full my-[124px] ">
      <div className="flex flex-col gap-10 w-full md:w-[80%] lg:w-[90%] ">
        <h2 className="font-bold text-white text-[28px] leading-[42px]">
          Create account with
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

        <form className="flex flex-col gap-10" onSubmit={continueToOtp}>
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
              {password.length < 6 && (
                <p className="text-start text-[#FFFEFA] text-[10px] ">
                  Password must be up to 6{" "}
                </p>
              )}
              <p className="text-start text-red-800 text-[10px] animate-pulse">
                {error}
              </p>
            </div>
          </div>
          <div className="flex gap-4 flex-col w-full">
            <button
              type="submit"
              disabled={
                email.trim() === "" || password.trim() === "" || isLoading
              }
              className={`font-semibold text-base rounded-xl h-12 w-full bg-gradient-to-b from-white to-gray-300 text-black transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                email === "" || password === "" || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:from-white/90 hover:to-gray-200"
              }`}
            >
              {isLoading ? (
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
                  Creating...
                </span>
              ) : (
                "Create account"
              )}
            </button>
            <p className="text-sm text-center text-white">
              Already have an account?{" "}
              <Link
                className="underline text-white hover:text-white/80 transition-colors font-bold"
                href="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
