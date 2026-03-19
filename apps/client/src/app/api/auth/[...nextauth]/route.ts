import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

const authUrl = process.env.AUTH_SERVICE_URL!

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${authUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      }
    }

    // console.log('REFRESH RESPONSE:', data)

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + data.accessTokenExpiresIn * 1000,
      tokenVersion: Date.now(),
      error: undefined,
    }
  } catch (error) {
    console.error('REFRESH ERROR', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    Credentials({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(`${authUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          })

          const user = await res.json()

          if (res.status === 404) {
            throw new Error('User does not exist')
          }
          if (res.status === 401) {
            throw new Error('Incorrect password')
          }
          if (!res.ok) {
            throw new Error(user.message || 'Login Failed')
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            accessTokenExpiresIn: user.accessTokenExpiresIn,
            refreshTokenExpiresIn: user.refreshTokenExpiresIn,
          }
        } catch (error) {
          console.error('Auth Login Failed:', error)
          return null
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile) {
        try {
          const res = await fetch(`${authUrl}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              firstName: (profile as any).given_name,
              lastName: (profile as any).family_name,
              image: user.image,
              provider: 'google',
              providerId: account.providerAccountId,
            }),
          })

          if (!res.ok) {
            const err = await res.json().catch(() => null)
            console.error('AUTH API ERROR:', err)
            return false
          }

          const apiUser = await res.json()
          user.id = apiUser.id
          user.role = apiUser.role
          user.accessToken = apiUser.accessToken
          user.refreshToken = apiUser.refreshToken
          user.accessTokenExpiresIn = apiUser.accessTokenExpiresIn
        } catch (err) {
          console.error('GOOGLE AUTH FETCH FAILED:', err)
          return false
        }
      }
      return true
    },

    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + user.accessTokenExpiresIn * 1000,
          refreshTokenExpires: Date.now() + user.refreshTokenExpiresIn * 1000,
          sessionStart: Date.now(),
          error: undefined,
        }
      }

      // console.log('JWT TOKEN:', token)
      // console.log('NOW:', Date.now())
      // console.log('EXPIRES:', token.accessTokenExpires)
      // console.log('Refresh EXPIRES:', token.refreshTokenExpires)

      // Refresh Token Expired LOGOUT
      if (Date.now() > (token.refreshTokenExpires as number)) {
        console.log('REFRESH TOKEN EXPIRED → FORCE LOGOUT')
        return {
          ...token,
          error: 'RefreshTokenExpired',
        }
      }

      // If Token Valid Return It
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      const refreshedToken = await refreshAccessToken(token)
      // console.log('New Token:', refreshedToken)

      return {
        ...token,
        // ...refreshedToken,
        id: refreshedToken.id,
        email: refreshedToken.email,
        role: refreshedToken.role,
        accessToken: refreshedToken.accessToken,
        refreshToken: refreshedToken.refreshToken,
        accessTokenExpires: refreshedToken.accessTokenExpires,
        tokenVersion: Date.now(),
        error: undefined,
      }
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.email = token.email as string
        session.accessToken = token.accessToken as string
        session.error = token.error as string | undefined
        ;(session as any).refreshToken = token.refreshToken
      }
      // console.log('session:', session)

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
