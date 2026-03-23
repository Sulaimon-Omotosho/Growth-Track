import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const PUBLIC_ROUTES = ['/sign-in', '/sign-up']
const ONBOARDING_ROUTE = '/onboarding'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
   console.log('MIDDLEWARE HIT:', req.nextUrl.pathname)

  // 🔑 Get token from NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // 🚫 Not logged in
  if (!token) {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // ✅ Logged in → fetch user from users-service
  try {
    const res = await fetch(
      `${process.env.USERS_SERVICE_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    )

    // ❌ user not found / invalid
    if (!res.ok) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    const user = await res.json()

    // 🚧 If onboarding not complete
    if (!user.username && pathname !== ONBOARDING_ROUTE) {
      return NextResponse.redirect(new URL(ONBOARDING_ROUTE, req.url))
    }

    // 🔒 Prevent going back to onboarding
    if (user.username && pathname === ONBOARDING_ROUTE) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // 🚫 Prevent accessing auth pages when logged in
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
}

// export const config = {
//   matcher: ['/dashboard/:path*', '/redirect', '/onboarding'],
// }
export const config = {
  matcher: [
    /*
     * Apply to all routes except:
     * - api
     * - static files
     * - images
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
