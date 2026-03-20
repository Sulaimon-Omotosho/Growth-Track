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
  username?: string
  email?: string
  phone?: string
  gender?: string
  // gender?: 'MALE' | 'FEMALE'
  dob?: Date
  about?: string
  role: string
  image?: string
  cell?: any
}

export interface Team {
  id: string
  name: string
  description?: string
  leaderId?: string
  leader?: User[]
  departments?: Department[]
}

export interface Department {
  id: string
  name: string
  churchTeamId?: string
  email?: string
  description?: string
  leaderId?: string
  leader?: User[]
  churchTeam?: Team[]
}

export interface District {
  id: string
  name: string
  leaderId?: string
  leader?: User[]
  communities?: Community[]
  users?: User[]
}

export interface Community {
  id: string
  name: string
  districtId?: string
  leaderId?: string
  leader?: User[]
  district?: District[]
  zones?: Zone[]
}

export interface Zone {
  id: string
  name: string
  communityId?: string
  leaderId?: string
  leader?: User[]
  community?: Community[]
  cells?: Cell[]
}

export interface Cell {
  id: string
  name: string
  communityId?: string
  zoneId?: string
  leaderId?: string
  leader?: User[]
  community?: Community[]
  zone?: Zone[]
  users?: User[]
}
