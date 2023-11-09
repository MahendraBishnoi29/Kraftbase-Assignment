import express from "express";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

import { UserModel } from "../db/users";

export const register = async (req: express.Request, res: express.Response) => {
  const { password } = req.body;
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    );

    const user = await UserModel.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username }).select(
      "password username"
    );

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid username or password!",
          },
        ],
      });
    }

    const decryptedPas = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJS.enc.Utf8);

    // If Password Doesn't Match
    if (decryptedPas !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Invalid username or password!",
          },
        ],
      });
    }

    user.password = undefined;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
