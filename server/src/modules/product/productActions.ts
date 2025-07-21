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

const read: RequestHandler = async (req, res, next) => {
  try {
    const product = await productRepository.find(Number(req.params.id));

    if (product === null) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    next(err);
  }
};

const readTrendProducts: RequestHandler = async (req, res, next) => {
  try {
    const trendProducts = await productRepository.trendProducts();
    res.status(200).json(trendProducts);
  } catch (error) {
    next(error);
  }
};

const updateTrendProducts: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const { trendProducts } = req.body;

    await productRepository.updateTrendProducts(trendProducts, productId);
    res.status(200).json({ message: "mise à jour ok" });
  } catch (error) {
    next(error);
  }
};

export default { browse, read, readTrendProducts, updateTrendProducts };
