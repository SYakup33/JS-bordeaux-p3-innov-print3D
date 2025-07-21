import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import userOdersRepository from "./userOdersRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (Number.isNaN(userId)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Identifiant doit être un nombre" });
      return;
    }
    const orders = await userOdersRepository.findByUserId(userId);

    if (orders == null) {
      res.status(StatusCodes.NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).json(orders);
    }
  } catch (err) {
    next(err);
  }
};
export default { read };
