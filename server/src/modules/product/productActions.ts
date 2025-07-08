import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import imageRepository from "../image/imageRepository";
import productRepository from "./productRepository";

const productSchema = joi.object({
  name: joi.string().max(100).required(),
  description: joi.string().max(255).required(),
  price: joi.number().integer().required(),
  category_id: joi.number().integer().required(),
  images: joi.array().items(joi.string()).required(),
});

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
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const product = {
      id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category_id: req.body.category_id,
    };
    const affectedRows = await productRepository.update(product);

    if (affectedRows === 0) {
      res.status(404);
    }
    await imageRepository.deleteByProductId(product.id);

    const images: string[] = req.body.images;
    await Promise.all(
      images.map((imagePath) =>
        imageRepository.add({
          product_id: product.id,
          path: imagePath,
        }),
      ),
    );
    res.status(204).json(product);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category_id: req.body.category_id,
    };

    const insertId = await productRepository.add(newProduct);

    const images: string[] = req.body.images;

    await Promise.all(
      images.map((imagePath) =>
        imageRepository.add({
          product_id: insertId,
          path: imagePath,
        }),
      ),
    );
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const protuctId = Number(req.params.id);

    await productRepository.delete(protuctId);

    res.status(204).json(protuctId);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });

  if (error == null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};
export default { browse, read, edit, add, destroy, validate };
