import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import userOrdersRepository from "./userOrdersRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (Number.isNaN(userId)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "l'identifiant doit être un nombre" });
      return;
    }
    const orders = await userOrdersRepository.findByUserId(userId);

    if (orders == null) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).json(orders);
    }
  } catch (err) {
    next(err);
  }
};
export default { read };
