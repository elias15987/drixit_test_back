import { Request, Response } from "express";
import User from "../models/users/users";
import  ServerUser  from "../models/users/users";

import {
  loginValidation,
  findUser,
  findUserById,
  loadAllUsers,
} from "../models/users/userServices";

import { generateToken } from "../utils/tokenService";

//Login by user name and password

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let loginCorrecto = loginValidation(email, password);
    if (loginCorrecto) {
      let user = new User();
      await findUser(email, password)
      .then((result) => {
        user = result;
      });
      //Generate token
      const token = generateToken(user?.id);
      res.status(200).json({ jwt: token });
    } else {
      res.status(403).json({ message: "Wrong email / password" });
    }
  } catch {
    res.status(400).send();
  }
};

//Get user by token

export const getUserByToken = async (req: Request, res: Response) => {
  try {
    let uId = req.body.userId;
    //find user by id
    let userLoged = new ServerUser();
    await findUserById(uId)
    .then((result) => {
      userLoged = new ServerUser({
        id: result.id,
        name: result.name,
        surname: result.surname,
        email: result.email,
        role: result.role,
        avatar: result.avatar,
        age: result.age,
      });
    });;
    if (userLoged) {
      res.json(userLoged);
    } else {
      res.status(403).send({ message: "Invalid token" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};



//Cargar usuarios a la DB
export const usersToDB = (req: Request, res: Response) => {
  try{
    loadAllUsers();
    res.send("ok");
  }
  catch(err){
    console.log(err);
  }
}