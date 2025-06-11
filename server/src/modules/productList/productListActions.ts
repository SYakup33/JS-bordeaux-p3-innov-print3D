import type { RequestHandler } from "express";

import productListRepository from "./productListRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const products = await productListRepository.readAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export default { browse };
