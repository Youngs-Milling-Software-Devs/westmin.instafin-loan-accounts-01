import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for the app
 * @param req NextRequest
 * @returns {Promise<NextResponse>}
 */
export default async function middleware(
  req: NextRequest,
): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  // Read cookie
  const isLoggedIn = req.cookies.get("flag")?.value === "true";

  console.log("isLoggine", isLoggedIn);

  // 1️⃣ Not logged in → block protected routes
  if (!isLoggedIn && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Logged in → prevent access to login page
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
		This protects everything except:
		/ (home page)
		/_next/* (Next.js static files)
		/favicon.ico
		/api/public/* (optional public APIs)
		*/
    "/",
    "/((?!$|_next|favicon.ico|api/public|.*\\.(?:png|jpg|jpeg|svg|gif|css|js|ico|woff2?)).*)",
  ],
};
