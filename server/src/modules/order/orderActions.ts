import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import orderRepository from "./orderRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = 1;
    const { products } = req.body;

    await orderRepository.create(userId, products);

    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    next(err);
  }
};

export default { add };
