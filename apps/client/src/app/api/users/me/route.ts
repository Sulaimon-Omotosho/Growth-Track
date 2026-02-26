import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return NextResponse.redirect(
      new URL('/auth/logout', process.env.NEXTAUTH_URL),
    )
  }

  const res = await fetch(`${process.env.USERS_SERVICE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })

  if (res.status === 401) {
    return NextResponse.redirect(
      new URL('/auth/logout', process.env.NEXTAUTH_URL),
    )
  }

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 },
    )
  }

  const user = await res.json()
  return NextResponse.json(user)
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return new Response('Unauthorized', { status: 401 })
  }

  const body = await req.json()

  const res = await fetch(`${process.env.USERS_SERVICE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return Response.json(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
