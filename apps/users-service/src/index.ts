import express, { Request, Response } from 'express'
import cors from 'cors'
import usersRoutes from './routes/users.routes.js'

const app = express()

app.use(express.json())
// app.use(cors())
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

app.use('/users', usersRoutes)

app.listen(8001, () => {
  console.log('User Service is running on port 8001')
})
