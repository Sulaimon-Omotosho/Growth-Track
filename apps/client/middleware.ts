import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const { pathname } = req.nextUrl

  // Not logged in
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // Logged in but not onboarded
  if (token && pathname !== '/onboarding') {
    const res = await fetch(
      `http://localhost:8001/users/by-email/${token.email}`,
    )
    const user = await res.json()

    if (!user.username) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/redirect', '/onboarding'],
}
