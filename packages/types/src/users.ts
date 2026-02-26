export interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email?: string
  phone?: string
  gender?: 'MALE' | 'FEMALE'
  dob?: Date
  about?: string
  role: string
  image?: string
  cell?: any
}
