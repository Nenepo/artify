// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";

// const PUBLIC_PATHS = ["/login", "/register", "/"];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Allow public routes
//   if (PUBLIC_PATHS.includes(pathname)) {
//     return NextResponse.next();
//   }

//   const token = request.cookies.get("__session");

//   // If no token, redirect to login
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next(); // Allow access
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // all routes except static
// };
