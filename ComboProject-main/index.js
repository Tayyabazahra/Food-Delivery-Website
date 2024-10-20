import express from "express";
import cors from "cors"
//import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import protectedRoute from './routes/protectedRoute.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from "./routes/orderRoutes.js"
import jwt from 'jsonwebtoken';
import verifyToken from "./middleware/authMiddleware.js";
import { Users } from "./models/user.js";
import cartRoutes from "./routes/cartRoutes.js";

//const user = require('../server/routes/user.js')
const app=express()
const PORT=process.env.PORT || 5555
const mongoDBURL= process.env.mongoDBURL || 'mongodb+srv://mahsood4404568:root123@bookstore.goegerg.mongodb.net/Food_Delivery_App?retryWrites=true&w=majority&appName=BookStore'
app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    console.log(req)
   return res.status(234).send('Welcome To Mern Stack Project')
})

//routes
app.use("/users",userRoutes);
app.use("/protected",protectedRoute);
app.use("/food",foodRoutes);
app.use("/images",express.static('uploads'))
app.use("/cart",cartRoutes);
app.use("/order",orderRoutes);

//connection
mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('MongoDB Connected');
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    });
})
.catch((err)=>{
    console.log(err)
})
