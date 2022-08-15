"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByToken = exports.login = void 0;
const userServices_1 = require("../models/users/userServices");
const tokenService_1 = require("../utils/tokenService");
//Login by user name and password
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let loginCorrecto = (0, userServices_1.loginValidation)(email, password);
        if (loginCorrecto) {
            let user = (0, userServices_1.findUser)(email, password);
            //Generate token
            const token = (0, tokenService_1.generateToken)(user === null || user === void 0 ? void 0 : user.id);
            res.status(200).json({ jwt: token });
        }
        else {
            res.status(403).json({ message: "Wrong email / password" });
        }
    }
    catch (_a) {
        res.status(400).send();
    }
});
exports.login = login;
//Get user by token
const getUserByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uId = req.body.userId;
        //find user by id
        let userLoged = (0, userServices_1.findUserById)(uId);
        if (userLoged) {
            res.json(userLoged);
        }
        else {
            res.status(403).send({ message: "Invalid token" });
        }
    }
    catch (e) {
        res.status(400).send(e);
    }
});
exports.getUserByToken = getUserByToken;
