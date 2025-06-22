import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import cartRepository from "./cartRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (Number.isNaN(userId)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Identifiant doit être un nombre" });
      return;
    }
    const products = await cartRepository.find(userId);

    if (products == null) {
      res.status(StatusCodes.NOT_FOUND);
    } else {
      res.status(StatusCodes.OK).json(products);
    }
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const updatedCart = {
      userId: Number(req.params.userId),
      productId: Number(req.params.productId),
      quantity: req.body.quantity,
    };

    if (
      Number.isNaN(updatedCart.userId) ||
      Number.isNaN(updatedCart.productId) ||
      Number.isNaN(updatedCart.quantity)
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Paramétres invalides" });
      return;
    }

    await cartRepository.updateCartQuantity(
      updatedCart.userId,
      updatedCart.productId,
      updatedCart.quantity,
    );

    res.status(StatusCodes.OK).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const deletedCart = {
      productId: Number(req.params.productId),
      userId: Number(req.params.userId),
    };

    if (
      Number.isNaN(deletedCart.userId) ||
      Number.isNaN(deletedCart.productId)
    ) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Paramétres invalides" });
      return;
    }

    await cartRepository.delete(deletedCart.userId, deletedCart.productId);

    res.status(StatusCodes.OK).json(deletedCart);
  } catch (err) {
    next(err);
  }
};

export default { browse, update, remove };
