import { login, register } from "controllers/auth";
import { UserModel } from "db/users";
import express from "express";
import { body } from "express-validator";
import { validate, verifyToken } from "handlers";
const router = express.Router();

router.post(
  "/signup",
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("confirmPassword must be at least 8 characters"),
  body("username").custom((value) => {
    return UserModel.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("username already used");
      }
    });
  }),
  validate,
  register
);

router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  validate,
  login
);

router.post("/verify-token", verifyToken, (req, res) => {
  //@ts-ignore
  res.status(200).json({ user: req.user });
});

module.exports = router;
