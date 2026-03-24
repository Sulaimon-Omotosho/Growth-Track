import express, { Request, Response } from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'

const PORT = process.env.PORT || 8000
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3002', 'http://localhost:3003']

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: allowedOrigins,
    // origin: ['http://localhost:3002', 'http://localhost:3003'],
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

// app.listen(8000, () => {
app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`)
})
