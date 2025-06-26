import type { RequestHandler } from "express";

import orderRepository from "./orderRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const { products } = req.body;

    await orderRepository.create(userId, products);

    res.status(201).json(products);
  } catch (err) {
    next(err);
  }
};

const addOrderFromCart: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.body.userId;
  } catch (err) {
    next(err);
  }
};

export default { add, addOrderFromCart };
