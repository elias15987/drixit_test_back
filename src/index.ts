import express from 'express';
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");


import { connectDB, disconnectDB } from "./db";

//Config
const app = express();
const port = process.env.PORT || 3000;
connectDB();

//Middleware
app.use(express.json());
app.use('/api/v0', authRoutes);
app.use('/api/v0', userRoutes);


app.listen(port, () => {
    console.log('Server listening on port:', port);
});


