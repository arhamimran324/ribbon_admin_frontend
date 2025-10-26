// // middleware.ts
// import { NextResponse } from "next/server";

// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Check if the request is for the root path
//   if (request.nextUrl.pathname === "/") {
//     // Redirect to the dashboard page
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// // Apply middleware to the base path
// export const config = {
//   matcher: ["/", "/login"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value; // Cookie se token lo
  const userId = request.cookies.get("userId")?.value; // User ID ko bhi check karo
  const isAuthenticated = authToken && userId; // Agar dono hain to authenticated hai

  const { pathname } = request.nextUrl;

  // 🔹 Agar root `/` par hain
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url)); // Authenticated user ko dashboard bhejo
    } else {
      return NextResponse.redirect(new URL("/login", request.url)); // Unauthenticated user ko login bhejo
    }
  }

  // 🔹 Agar koi dashboard ka page open kar raha hai aur user authenticated nahi hai
  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Middleware sirf `/` aur `/dashboard` routes par chalega
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
