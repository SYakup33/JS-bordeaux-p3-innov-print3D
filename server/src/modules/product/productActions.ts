import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import productRepository from "./productRepository";

const browse: RequestHandler = async (req, res, next) => {
  const { name, categoryId, minPrice, maxPrice, description } = req.query;

  try {
    const products = await productRepository.findBy(
      name,
      categoryId,
      minPrice,
      maxPrice,
      description,
    );

    if (products === null) {
      res.status(StatusCodes.NOT_FOUND);
    }

    res.json(products);
  } catch (err) {
    next(err);
  }
};

export default { browse };
