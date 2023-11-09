import { UserModel } from "db/users";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Middleware to validate request using express-validator.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Function to check if a value is a valid ObjectId.
 * @param {string} value - The value to check.
 * @returns {boolean} - Returns true if the value is a valid ObjectId; otherwise, false.
 */
export const isObjectId = (value: string): boolean =>
  mongoose.Types.ObjectId.isValid(value);

/**
 * Decode a JWT token.
 * @param {Request} req - Express request object.
 * @returns {any} - Returns the decoded token payload or false if decoding fails.
 */

const tokenDecode = (req: Request): any => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const tokenDecoded = jwt.verify(
        bearer,
        process.env.TOKEN_SECRET
      ) as string;
      return tokenDecoded;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  } else {
    return false;
  }
};

/**
 * Middleware to verify and decode a JWT token.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const user = await UserModel.findById(tokenDecoded.id);
    if (!user) return res.status(401).json("Unauthorized");
    //@ts-ignore
    req.user = user;
    next();
  } else {
    res.status(401).json("Unauthorized");
  }
};
