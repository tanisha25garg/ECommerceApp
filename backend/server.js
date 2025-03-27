import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 5000

// Middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.get('/', (req, res) => res.status(200).send('API working'))

// Listener
app.listen(port, () => console.log(`Listening on localhost:${port}`))
