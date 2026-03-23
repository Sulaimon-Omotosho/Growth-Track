import {
  Request,
  Response,
  Router,
  type Router as ExpressRouter,
} from 'express'
import { prisma } from '@repo/users-db'
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js'
import axios from 'axios'

const router: ExpressRouter = Router()

// Search A User
router.get('/searchUser', async (req: Request, res: Response) => {
  const q = (req.query.q as string) || ''

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: q,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: q,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      take: 10,
    })

    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get Current User
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  const authId = req.user?.id

  if (!authId) {
    return res.status(401).json({ message: 'Unauthenticated' })
  }

  const user = await prisma.user.findUnique({
    where: { authId },
    include: {
      cell: {
        select: {
          id: true,
          name: true,
          zone: {
            select: { name: true },
          },
          community: {
            select: { name: true },
          },
        },
      },
      departments: {
        select: {
          id: true,
          name: true,
          churchTeam: {
            select: { name: true },
          },
        },
      },
      growthRecord: true,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json(user)
})

// Get All Users
router.get('/all', authenticate, async (req: AuthRequest, res) => {
  if (req.user!.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const user = await prisma.user.findMany({
    select: { id: true, username: true, email: true, role: true },
  })

  res.json(user)
})

// Create A User
router.post('/newUser', async (req: Request, res: Response) => {
  const { authId, email, firstName, lastName, image } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' })
  }

  const newUser = await prisma.user.create({
    data: {
      authId,
      email,
      firstName,
      lastName,
      image,
      role: 'MEMBER',
    },
  })
  return res
    .status(200)
    .json({ message: 'User created in user-db', user: newUser })
})

// Update Profile
router.patch('/me', authenticate, async (req: AuthRequest, res) => {
  const authId = req.user?.id

  if (!authId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { firstName, lastName, username, email, phone, gender, dob, about } =
    req.body

  try {
    // Username uniqueness check
    if (username) {
      const existing = await prisma.user.findUnique({
        where: { username },
      })

      if (existing && existing.authId !== authId) {
        return res.status(409).json({ message: 'Username already taken' })
      }
    }

    const updatedUser = await prisma.user.update({
      where: { authId },
      data: {
        firstName,
        lastName,
        username,
        email,
        phone,
        gender,
        dob: dob ? new Date(dob) : undefined,
        about,
      },
      select: {
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        phone: true,
        gender: true,
        dob: true,
        about: true,
      },
    })

    return res.json(updatedUser)
  } catch (error) {
    console.error('Failed to update:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// Get By Email
router.get('/byEmail', async (req: Request, res: Response) => {
  const email = req.query.email as string
  // const email = req.params.email as string

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      authId: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      phone: true,
      image: true,
      role: true,
      createdAt: true,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json(user)
})

// DEBUG
router.get('/debug/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
    },
  })
  res.json(users)
})

// Get A User
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  if (req.user!.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' })
  }

  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
})

// Update Role
router.patch(
  '/:id/role',
  authenticate,
  async (req: AuthRequest, res: Response) => {
    const requesterRole = req.user?.role
    const targetUserId = req.params.id
    const { role } = req.body

    const allowedRoles = [
      'ADMIN',
      'CAMPUS_PASTOR',
      'PASTOR',
      'TEAM',
      'HOD',
      'DISTRICT',
      'ZONE',
    ]

    if (!allowedRoles.includes(requesterRole!)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    try {
      const updatedRole = await prisma.user.update({
        where: { id: targetUserId as string },
        data: { role },
      })

      const newAuthRole = allowedRoles.includes(role) ? 'ADMIN' : 'USER'

      // Call auth-service
      await axios.patch(
        `${process.env.AUTH_SERVICE_URL}/auth/users/${updatedRole.authId}/role`,
        { role: newAuthRole },
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        },
      )

      return res.json(updatedRole)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Failed to update role' })
    }
  },
)

export default router
