"use client";

import { generateOTP, sendOtpToEmail } from "@/lib/otp";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";

function OTP({
  email,
  generatedOtp,
  onVerified,
  goBack,
}: {
  email: string;
  generatedOtp: string;
  onVerified: () => void;
  goBack: () => void;
}) {
  const [otp, setOtp] = useState(Array(5).fill(""));
  const [timer, setTimer] = useState(300);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}.${sec.toString().padStart(2, "0")} mins`;
  };

  const handleResend = async () => {
    const newOtp = generateOTP();
    await sendOtpToEmail(email, newOtp);
    setOtp(Array(5).fill(""));
    setTimer(300);
    toast.success("OTP resent!");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").trim();

    if (pasted.length === otp.length && /^\d+$/.test(pasted)) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      // Focus the last field
      inputsRef.current[otp.length - 1]?.focus();
    }
  };
  const isOtpComplete = otp.every((digit) => digit !== "");


const handleVerify = () => {
  const inputOtp = otp.join("");

  // prevent accidental empty match
  if (inputOtp.length !== 5 || generatedOtp.length !== 5) {
    toast.error("Incomplete or invalid OTP");
    return;
  }

  if (inputOtp === generatedOtp) {
    toast.success("OTP Verified!");
    setOpenModal(true); // only trigger modal after check
    onVerified();
  } else {
    toast.error("Invalid OTP, try again");
  }
};


  return (
    <>
      <div className="mt-[148px] w-full md:w-[507px] flex flex-col gap-[60px] items-center justify-center">
        <div className="md:w-[314px] w-full flex flex-col gap-6 items-center justify-center ">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl text-text-white text-center ">
              Verify email address
            </h2>
            <p className="text-xs text-center text-text-white">
              Please enter the{" "}
              <span className="font-bold ">5 digit OTP code</span> sent to this
              email <span>{email}</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="gap-2 flex">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={(e) => handlePaste(e)}
                  ref={(el) => {
                    if (el) inputsRef.current[idx] = el;
                  }}
                  className="w-10 h-12 text-center text-lg rounded-md bg-[#0b007d] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white text-white"
                />
              ))}
            </div>
            <p className="text-[14px] leading-5 text-text-white">
              Didn’t get code?{" "}
              <span
                className="underline font-bold cursor-pointer"
                onClick={handleResend}
              >
                Resend
              </span>
            </p>
            <p className="text-white">Code expires in {formatTime(timer)}</p>
          </div>
        </div>
        <div className="flex justify-between w-full">
       <button
  onClick={handleVerify}
  disabled={!isOtpComplete || timer === 0}
  className={`bg-gradient-to-b from-white to-gray-300 text-black px-4 py-2 rounded-lg w-[48%] transition-all duration-300 ${
    !isOtpComplete || timer === 0
      ? "opacity-50 cursor-not-allowed"
      : "hover:shadow-lg hover:-translate-y-1 hover:from-white/90 hover:to-gray-200 cursor-pointer"
  }`}
>

            Verify number
          </button>
          <button
            onClick={goBack}
            className="bg-[#0b007d] border border-white text-white px-4 py-2 rounded-lg w-[48%] cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
      <Modal
        openModal={openModal}
        modalTitle="Verification Successful"
        buttonText="Continue to login"
        text="Congratulations you have successfully created your account"
        closeModal={() => router.push("/login")}
      />
    </>
  );
}

export default OTP;
