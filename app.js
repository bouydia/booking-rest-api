import express from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import usersRoute from './routes/users.js'
import roomsRoute from './routes/rooms.js'

dotenv.config() 
const app = express()

//Connection to Database
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION)
        console.log("Database Connected Successfully.");
    } catch (error) { 
        throw error
    }
}

//middleware
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Somyhing went wong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack:err.stack  
    })
})

mongoose.connection.on('disconnected',()=>console.log('Database disconnect'))
app.listen(8800, () => {
    connect()
    console.log("Server Running on Port 8800.");
})
