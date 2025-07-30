import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().set("session", "", { maxAge: 0, path: "/" });
  return NextResponse.json({ status: "logged out" });
}
