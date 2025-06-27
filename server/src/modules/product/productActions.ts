import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import productRepository from "./productRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const products = await productRepository.findAll();

    if (products === null) {
      res.status(StatusCodes.NOT_FOUND);
    }

    res.json(products);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await productRepository.find(productId);

    if (product === null) {
      res.status(StatusCodes.NOT_FOUND);
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

export default { browse, read };
