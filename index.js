import express, {json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import usersRoute from './routes/users-route.js'
import usersAuth from './routes/users-auth.js'

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 4000;
const corsOption = {credential:true, origin: process.env.URL || '*'}

app.use(cors(corsOption))
app.use(json())
app.use(cookieParser())

app.use('/', express.static(join(__dirname, 'public')))
app.use('/api/users', usersRoute)
app.use('/api/auth', usersAuth)

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}/`)
})