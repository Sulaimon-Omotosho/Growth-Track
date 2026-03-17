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

    const text = await res.text()
    console.log('REFRESH RESPONSE:', text)

    if (!res.ok) {
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      }
    }

    const data = JSON.parse(text)
    // const data = await res.json()

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + 8 * 60 * 60 * 1000,
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
  // debug: true,
  // adapter: PrismaAdapter
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
        // console.log('CREDENTIALS:', credentials)

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
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 8 * 60 * 60 * 1000,
        }
      }

      // If Token Valid Return It
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // If RefreshToken Missing, Force Logout
      if (!token.refreshToken) {
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        }
      }

      // Token Expired, Refresh It
      return await refreshAccessToken(token)
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
      return session
    },
  },
  // events: {
  //   async createUser({ user }) {
  //     await prisma.user.update({
  //       where: { id: user.id },
  //       data: {
  //         role: 'MEMBER',
  //       },
  //     })
  //   },
  // },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
