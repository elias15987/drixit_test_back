"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const cors = require("cors");
//Config
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//Middleware
app.use(express_1.default.json());
app.use(cors);
app.use('/api/v0', authRoutes);
app.use('/api/v0', userRoutes);
app.listen(port, () => {
    console.log('Server listening on port:', port);
});
