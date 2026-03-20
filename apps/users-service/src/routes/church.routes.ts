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

// Search A District
router.get('/searchDistrict', async (req: Request, res: Response) => {
  const q = (req.query.q as string) || ''

  try {
    const district = await prisma.district.findMany({
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

    res.json(district)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Search A Community
router.get('/searchCommunities', async (req: Request, res: Response) => {
  const q = (req.query.q as string) || ''

  try {
    const community = await prisma.community.findMany({
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

    res.json(community)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Search A Zone
router.get('/searchZones', async (req: Request, res: Response) => {
  const q = (req.query.q as string) || ''
  const communityId = req.query.communityId as string

  try {
    const zone = await prisma.zone.findMany({
      where: {
        AND: [
          {
            name: {
              contains: q,
              mode: 'insensitive',
            },
          },
          {
            communityId: communityId,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        communityId: true,
      },
      take: 10,
    })

    res.json(zone)
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

// Create A New Department
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

// Add A Community
router.post('/addCommunity', async (req: Request, res: Response) => {
  const { name, leaderId, districtId } = req.body

  if (!name || !leaderId) {
    return res
      .status(400)
      .json({ message: 'Community needs name, district and pastor' })
  }

  try {
    const pastor = await prisma.user.findUnique({ where: { id: leaderId } })
    if (!pastor) {
      return res.status(404).json({ message: 'Pastor not found' })
    }
    const district = await prisma.district.findUnique({
      where: { id: districtId },
    })
    if (!district) {
      return res.status(404).json({ message: 'District not found' })
    }

    const community = await prisma.community.create({
      data: {
        name,
        leaderId,
        districtId,
      },
    })

    res.status(201).json(community)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Add A Zone
router.post('/addZone', async (req: Request, res: Response) => {
  const { name, leaderId, communityId } = req.body

  if (!name || !leaderId) {
    return res
      .status(400)
      .json({ message: 'Zone needs name, community and pastor' })
  }

  try {
    const pastor = await prisma.user.findUnique({ where: { id: leaderId } })
    if (!pastor) {
      return res.status(404).json({ message: 'Pastor not found' })
    }
    const community = await prisma.community.findUnique({
      where: { id: communityId },
    })
    if (!community) {
      return res.status(404).json({ message: 'Community not found' })
    }

    const zone = await prisma.zone.create({
      data: {
        name,
        leaderId,
        communityId,
      },
    })

    res.status(201).json(zone)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Add A Cell
router.post('/addCell', async (req: Request, res: Response) => {
  const { name, leaderId, zoneId, communityId } = req.body

  if (!name || !leaderId) {
    return res
      .status(400)
      .json({ message: 'cell needs name, zone and cell leader' })
  }

  try {
    const leader = await prisma.user.findUnique({ where: { id: leaderId } })
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' })
    }
    const zone = await prisma.zone.findUnique({
      where: { id: zoneId },
      select: {
        id: true,
        communityId: true,
      },
    })
    if (!zone) {
      return res.status(404).json({ message: 'Zone not found' })
    }

    const cell = await prisma.cell.create({
      data: {
        name,
        leaderId,
        zoneId: zone.id,
        communityId: zone.communityId,
      },
    })

    res.status(201).json(cell)
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
