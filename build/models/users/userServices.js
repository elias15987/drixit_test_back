"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUser = exports.loginValidation = void 0;
const users_1 = require("./users");
const loginValidation = (email, pass) => {
    return users_1.users.some(u => u.email === email && u.password === pass);
};
exports.loginValidation = loginValidation;
const findUser = (email, pass) => {
    return users_1.users.find(u => u.email === email && u.password === pass);
};
exports.findUser = findUser;
const findUserById = (id) => {
    return users_1.users.find(u => u.id === id);
};
exports.findUserById = findUserById;
