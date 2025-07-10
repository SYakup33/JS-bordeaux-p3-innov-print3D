import argon2 from "argon2";
import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import AuthRepository from "../user/userRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await AuthRepository.findByEmail(email);

    if (user == null) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: "utilisateur introuvable" });
      return;
    }

    const verified = await argon2.verify(user.password, password);

    if (verified) {
      const { password, ...userWithoutHashedPassword } = user;

      const myPayload: MyPayload = {
        sub: user.id.toString(),
        role: user.role,
      };

      const token = await jwt.sign(
        myPayload,
        process.env.APP_SECRET as string,
        {
          expiresIn: "1h",
        },
      );

      res.json({
        token,
        user: userWithoutHashedPassword,
      });
    } else {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: "Mot de passe incorrect" });
    }
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Token manquant");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Type token invalide");
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;

    next();
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.UNAUTHORIZED);
  }
};

export default { login, verifyToken };
