import express, { Request, Response } from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3002', 'http://localhost:3003'],
    credentials: true,
  }),
)

app.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  })
})

app.use('/auth', authRoutes)

app.listen(8000, () => {
  console.log('Auth service is running on port 8000')
})
