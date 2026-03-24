import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../utils/theme-provider'
import Providers from '../lib/Providers'
import AuthGuard from '../lib/AuthGuard'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Growth Tracker',
  description:
    'Growth Tracker is an HICC web app for tracking growth of its members',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=''>
          <Providers>
            <AuthGuard>
              <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </AuthGuard>
          </Providers>
        </div>
      </body>
    </html>
  )
}
