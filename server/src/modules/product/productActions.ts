import fs from "node:fs";
import path from "node:path";
import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import imageRepository from "../image/imageRepository";
import productRepository from "./productRepository";

const productSchema = joi
  .object({
    name: joi.string().max(100).required().messages({
      "string.empty": "Création du produit : Le nom du produit est requis.",
      "string.max":
        "Création du produit : Le nom du produit ne doit pas dépasser les 100 caractères.",
    }),
    description: joi.string().required().messages({
      "string.empty":
        "Création du produit : La description du produit est requise.",
    }),
    price: joi.number().greater(0).required().messages({
      "number.base":
        "Création du produit : Le prix doit être strictement supérieur à 0.",
      "number.greater":
        "Création du produit : Le prix doit être strictement supérieur à 0.",
      "any.required": "Création du produit : Le prix est requis.",
    }),
    category_id: joi.number().integer().valid(1, 2, 3).required().messages({
      "any.only":
        "Création du produit : La catégorie du produit est manquante.",
    }),
    imageIds: joi.array().items(joi.string().pattern(/^\d+$/)).default([]),
  })
  .options({ convert: true });

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

const read: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const product = await productRepository.find(id);
    if (product === null) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const existingProduct = await productRepository.find(id);
    if (!existingProduct) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }

    const product = {
      id,
      name: req.body.name || existingProduct.name,
      description: req.body.description || existingProduct.description,
      price:
        req.body.price !== undefined && req.body.price !== ""
          ? Number(req.body.price)
          : existingProduct.price,
      category_id:
        req.body.category_id !== undefined && req.body.category_id !== ""
          ? Number(req.body.category_id)
          : existingProduct.category_id,
    };

    const affectedRows = await productRepository.update(product);

    if (affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).json(product);
      return;
    }
    const imageIds = req.body.imageIds;
    await Promise.all(
      imageIds.map(async (id: string) => {
        const file = (req.files as Express.Multer.File[]).find(
          (f) => f.fieldname === `image-${id}`,
        );

        if (file) {
          const extension = path.extname(file.originalname);
          const oldPath = path.join("public/uploads/products", file.filename);
          const newFilename = file.filename + extension;
          const newPath = path.join("public/uploads/products", newFilename);
          await fs.promises.rename(oldPath, newPath);

          await imageRepository.update({
            id: Number(id),
            path: `/uploads/products/${newFilename}`,
            product_id: product.id,
          });
        }
      }),
    );

    res.status(StatusCodes.OK).json(product);
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

    const files = req.files as Express.Multer.File[];

    await Promise.all(
      files.map(async (file) => {
        const extension = path.extname(file.originalname);
        const oldPath = path.join("public/uploads/products", file.filename);
        const newFilename = file.filename + extension;
        const newPath = path.join("public/uploads/products", newFilename);

        await fs.promises.rename(oldPath, newPath);

        await imageRepository.add({
          product_id: insertId,
          path: `/uploads/products/${newFilename}`,
        });
      }),
    );

    res.status(StatusCodes.CREATED).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const protuctId = Number(req.params.id);

    await productRepository.delete(protuctId);

    res.status(StatusCodes.OK).json({ deletedId: protuctId });
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });

  const files = req.files as Express.Multer.File[] | undefined;

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      validationErrors: error.details.map((err) => ({
        message: err.message,
        path: err.path,
      })),
    });
    return;
  }
  if (req.method === "POST") {
    const files = req.files as Express.Multer.File[] | undefined;
    const filecount = files?.length || 0;
    if (filecount === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        validationErrors: [
          { message: "Création du produit : Les images sont manquantes." },
        ],
      });
      return;
    }
    if (filecount === 1 || filecount === 2) {
      res.status(StatusCodes.BAD_REQUEST).json({
        validationErrors: [
          {
            message: `Création du produit : Il manque ${3 - filecount} images.`,
          },
        ],
      });
      return;
    }
  }
  next();
};

export default { browse, read, edit, add, destroy, validate };
