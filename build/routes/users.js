"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const tokenService_1 = require("../utils/tokenService");
const router = express_1.default.Router();
//get user
router.post('/users/me', tokenService_1.tokenValidation, tokenService_1.idByToken, usersController_1.getUserByToken);
module.exports = router;
