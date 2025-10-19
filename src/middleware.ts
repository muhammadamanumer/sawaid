import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware is now a no-op. Language is handled client-side.
// We keep the file to avoid breaking the build if it's referenced somewhere.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
