import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const checkIfEmailExists = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  return !snapshot.empty; // true if email exists
};