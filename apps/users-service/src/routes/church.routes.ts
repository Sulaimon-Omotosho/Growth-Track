import {
  Request,
  Response,
  Router,
  type Router as ExpressRouter,
} from 'express'
import { prisma } from '@repo/users-db'
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js'

const router: ExpressRouter = Router()

// Search A Team
router.get('/searchTeam', async (req: Request, res: Response) => {
  const q = (req.query.q as string) || ''

  try {
    const teams = await prisma.churchTeam.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
      },
      take: 10,
    })

    res.json(teams)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create A New Team
router.post('/addTeam', async (req: Request, res: Response) => {
  const { name, leaderId, description } = req.body

  if (!name || !leaderId) {
    return res
      .status(400)
      .json({ message: 'Team name and Pastor are required' })
  }

  try {
    // const team = await prisma.churchTeam.findUnique({ where: { name } })
    // if (team) {
    //   return res.status(404).json({ message: 'Team already exist' })
    // }

    const pastor = await prisma.user.findUnique({ where: { id: leaderId } })
    if (!pastor) {
      return res.status(404).json({ message: 'Pastor not found' })
    }

    const churchTeam = await prisma.churchTeam.create({
      data: {
        name,
        leaderId,
        description,
      },
    })

    res.status(201).json(churchTeam)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Create A New Team
router.post('/addDepartment', async (req: Request, res: Response) => {
  const { name, leaderId, churchTeamId, email, description } = req.body

  if (!name || !leaderId || !churchTeamId) {
    return res
      .status(400)
      .json({ message: 'Department name and Pastor are required' })
  }

  try {
    // const team = await prisma.churchTeam.findUnique({ where: { name } })
    // if (team) {
    //   return res.status(404).json({ message: 'Team already exist' })
    // }

    const pastor = await prisma.user.findUnique({ where: { id: leaderId } })
    if (!pastor) {
      return res.status(404).json({ message: 'Pastor not found' })
    }

    const churchDepartment = await prisma.department.create({
      data: {
        name,
        churchTeamId,
        email,
        leaderId,
        description,
      },
    })

    res.status(201).json(churchDepartment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Add A District
router.post('/addDistrict', async (req: Request, res: Response) => {
  const { name, leaderId } = req.body

  if (!name || !leaderId) {
    return res.status(400).json({ message: 'District needs name and pastor' })
  }

  try {
    const pastor = await prisma.user.findUnique({ where: { id: leaderId } })
    if (!pastor) {
      return res.status(404).json({ message: 'Pastor not found' })
    }

    const district = await prisma.district.create({
      data: {
        name,
        leaderId,
      },
    })

    res.status(201).json(district)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Get All Teams
router.get('/teams', async (req: Request, res: Response) => {
  try {
    const teams = await prisma.churchTeam.findMany({
      include: {
        leader: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    })

    res.json(teams)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
