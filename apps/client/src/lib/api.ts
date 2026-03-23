const API_URL = process.env.NEXT_PUBLIC_USERS_SERVICE_URL

export async function fetcher<T>(
  url: string,
  token?: string,
  options?: RequestInit,
): Promise<T> {
  // const res = await fetch(`${API_URL}${url}`, {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    // cache: 'no-store',
  })

  if (!res.ok) {
    const error = new Error(`HTTP error! status: ${res.status}`)
    throw error
  }

  return res.json()
}
