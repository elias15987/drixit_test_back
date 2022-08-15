import express from "express";

import { getUserByToken, usersToDB } from "../controllers/usersController";
import { tokenValidation, idByToken } from "../utils/tokenService";

const router = express.Router();

//get user
router.post('/users/me', tokenValidation, idByToken, getUserByToken );


router.get('/cargarUsuarios', usersToDB);

module.exports = router;