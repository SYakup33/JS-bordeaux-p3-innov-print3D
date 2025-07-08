import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "./userRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      street: req.body.street,
      zip_code: req.body.zip_code,
      city: req.body.city,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };

    const insertId = await userRepository.create(newUser);

    if (insertId === 0) {
      res.status(StatusCodes.UNAUTHORIZED);
    } else res.status(StatusCodes.CREATED).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { add };
