import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY!);

// Prevent re-initialization of Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export async function POST(request: Request) {
  const { token } = await request.json();

  const expiresIn = 60 * 60 * 24 * 5;

  const sessionCookie = await getAuth().createSessionCookie(token, { expiresIn });

  const cookieStore = cookies(); // ⛔ DO NOT add `await` here

  // ✅ Set the cookie correctly
  cookieStore.set({
    name: "session",
    value: sessionCookie,
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
  });

  return NextResponse.json({ status: "success" });
}
