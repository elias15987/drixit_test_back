import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ServerUser } from "../models/users/users";

export const generateToken = (id?: string) => {
  const token: string = jwt.sign(
    { _id: id },
    process.env.TOKEN_SECRET || "",
    {
      expiresIn: process.env.TOKEN_TIME,
    }
  );
  return token;
};

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json("Access Denied");
    const user = jwt.verify(
      token,
      process.env.TOKEN_SECRET || ""
    ) as ServerUser;
    next();
  } catch (e) {
    res.status(400).send("Invalid Token");
  }
};

export const idByToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    if (token) {
      const tokenParts = token.split(".");
      const encodedUser = tokenParts[1];
      const rawUser = atob(encodedUser);
      const userLog = JSON.parse(rawUser);
      req.body.userId = userLog?._id;
      next();
    } else {
      res.status(400).json({ message: "Need token" });
    }
  } catch (e) {
    res.status(400).json({ message: "Bad Request" });
  }
};