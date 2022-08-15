"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idByToken = exports.tokenValidation = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ _id: id }, process.env.TOKEN_SECRET || "", {
        expiresIn: process.env.TOKEN_TIME,
    });
    return token;
};
exports.generateToken = generateToken;
const tokenValidation = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(401).json("Access Denied");
        const user = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "");
        next();
    }
    catch (e) {
        res.status(400).send("Invalid Token");
    }
};
exports.tokenValidation = tokenValidation;
const idByToken = (req, res, next) => {
    try {
        const { token } = req.body;
        if (token) {
            const tokenParts = token.split(".");
            const encodedUser = tokenParts[1];
            const rawUser = atob(encodedUser);
            const userLog = JSON.parse(rawUser);
            req.body.userId = userLog === null || userLog === void 0 ? void 0 : userLog._id;
            next();
        }
        else {
            res.status(400).json({ message: "Need token" });
        }
    }
    catch (e) {
        res.status(400).json({ message: "Bad Request" });
    }
};
exports.idByToken = idByToken;
