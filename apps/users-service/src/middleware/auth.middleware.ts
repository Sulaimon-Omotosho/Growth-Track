import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No auth header' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token!,
      process.env.JWT_SECRET!,
    ) as jwt.JwtPayload

    if (!decoded.sub || !decoded.role) {
      return res.status(401).json({ message: 'Invalid token payload' })
    }

    req.user = {
      id: String(decoded.sub),
      role: String(decoded.role),
    }

    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
