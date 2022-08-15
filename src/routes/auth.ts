import express from "express";

import { login } from "../controllers/usersController";

const router = express.Router();

//login
router.post('/authenticate', login);

module.exports = router;