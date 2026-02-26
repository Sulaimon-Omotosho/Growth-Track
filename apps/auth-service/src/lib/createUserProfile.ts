// import fetch from 'node-fetch'

export async function createUserProfile(payload: {
  email: string
  authId: string
  firstName?: string
  lastName?: string
  image?: string
}) {
  try {
    const res = await fetch('http://localhost:8001/users/newUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    // Ignore "already exists"
    if (!res.ok && res.status !== 409) {
      const text = await res.text()
      console.error('User-service error:', text)
    }
  } catch (err) {
    console.error('Failed to call user-service:', err)
  }
}
