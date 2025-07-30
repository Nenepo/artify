// OTP logic (generate, send, verify)

import { doc, setDoc, getDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const generateOTP = () => {
  return Array(5)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
};

export const sendOtpToEmail = async (to: string, otp: string) => {
  await fetch("/api/send-otp", {
    method: "POST",
    body: JSON.stringify({ to, otp }),
  });
};
export const verifyOtp = async (email: string, inputOtp: string) => {
  const docRef = doc(db, "emailOtps", email);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return { success: false, message: "Code not found" };

  const data = docSnap.data();
  const now = new Date();

  if (now > data.expiresAt.toDate()) return { success: false, message: "Code expired" };
  if (data.otp !== inputOtp) return { success: false, message: "Invalid code" };

  return { success: true };
};
