import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import productRepository from "./productRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const products = await productRepository.findBy(req.query);

    if (products === null) {
      res.status(StatusCodes.NOT_FOUND);
    }

    res.json(products);
  } catch (err) {
    next(err);
  }
};

export default { browse };
