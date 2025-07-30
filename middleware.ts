import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);

try {
  initializeApp({
    credential: cert(serviceAccount),
  });
} catch (e) {}

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value || "";
  try {
    await getAuth().verifySessionCookie(sessionCookie, true);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/profile", "/some-private-route"], // your protected pages
};
