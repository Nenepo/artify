import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const checkIfEmailExists = async (email: string) => {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length > 0; // true if email exists in Firebase Auth
};
