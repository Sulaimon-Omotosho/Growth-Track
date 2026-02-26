import {
  Request,
  Response,
  Router,
  type Router as ExpressRouter,
} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@repo/auth-db'
import { createUserProfile } from '../lib/createUserProfile'

const router: ExpressRouter = Router()
// CREATE TOKEN
export function issueAccessToken(user: { id: string; role: string }) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  })
}

router.get('/debug', async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true },
  })
  res.json(users)
})

// LOGIN
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  // console.log('the email', email)
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const valid = await bcrypt.compare(password, user.password as string)
  if (!valid) {
    return res.status(401).json({ message: 'Invalid password' })
  }

  const accessToken = issueAccessToken({
    id: user.id,
    role: user.role,
  })

  return res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    accessToken,
  })
})

// REGISTER USER
router.post('/register', async (req: Request, res: Response) => {
  // console.log('data:', req.body)

  const { email, password, provider = 'credentials' } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password is required' })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: password ? await bcrypt.hash(password, 13) : null,
        role: 'USER',
      },
    })

    await createUserProfile({ email, authId: user.id })

    const accessToken = issueAccessToken({
      id: user.id,
      role: user.role,
    })

    return res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Signup failed' })
  }
})

// GOOGLE
router.post('/google', async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, image, providerId } = req.body

    if (!email || !providerId) {
      return res.status(400).json({ message: 'Invalid Google payload' })
    }

    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          role: 'USER',
        },
      })
    }

    await createUserProfile({
      email,
      firstName,
      lastName,
      image,
      authId: user.id,
    })

    const accessToken = issueAccessToken({
      id: user.id,
      role: user.role,
    })

    return res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken,
    })
  } catch (err) {
    console.error('GOOGLE AUTH API ERROR:', err)
    return res.status(500).json({ message: 'Google auth failed' })
  }
})

export default router
