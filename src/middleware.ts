import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow access only to homepage and essential paths
  if (pathname === '/' || pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon.ico') || pathname.startsWith('/Logo')) {
    return NextResponse.next()
  }
  
  // Redirect all other pages to homepage
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
