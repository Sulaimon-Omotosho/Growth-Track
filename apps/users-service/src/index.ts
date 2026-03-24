import express, { Request, Response } from 'express'
import cors from 'cors'
import usersRoutes from './routes/users.routes.js'
import churchRoutes from './routes/church.routes.js'

const PORT = process.env.PORT || 8001
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3002', 'http://localhost:3003']

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
)
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true)
//       return callback(null, origin)
//     },
//     credentials: true,
//   }),
// )

app.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  })
})

app.use('/users', usersRoutes)
app.use('/church', churchRoutes)

// app.listen(8001, () => {
app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`)
})
