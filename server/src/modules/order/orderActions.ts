import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import orderRepository from "./orderRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth.sub);
    const { products } = req.body;

    await orderRepository.create(userId, products);

    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    next(err);
  }
};

const gestUsersOrders: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth?.sub);

    const [orders] = await orderRepository.find(userId);
    if (!req.auth) {
      res
        .status(401)
        .json({ message: "Non authentifié : token manquant ou invalide." });
      return;
    }

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export default { add, gestUsersOrders };
