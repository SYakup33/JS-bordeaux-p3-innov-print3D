import type { RequestHandler } from "express";

import productRepository from "./productRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const products = await productRepository.findAll();
    if (products == null) {
      res.sendStatus(404);
    } else {
      res.json(products);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse };
