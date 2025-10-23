import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always allow static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/Logo')
  ) {
    return NextResponse.next()
  }

  // Optional maintenance mode (set NEXT_PUBLIC_MAINTENANCE=1 to enable)
  if (process.env.NEXT_PUBLIC_MAINTENANCE === '1') {
    if (pathname === '/') return NextResponse.next()
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Allow all routes in normal mode
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
