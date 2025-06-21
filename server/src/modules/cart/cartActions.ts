
import type { RequestHandler } from "express";
import cartRepository from "./cartRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const products = await cartRepository.find(userId);

    if (products == null) {
      res.sendStatus(404);
    } else {
      res.json(products);
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

    await cartRepository.updateCartQuantity(
      updatedCart.userId,
      updatedCart.productId,
      updatedCart.quantity
    );

    res.json(updatedCart);
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

    await cartRepository.delete(deletedCart.userId, deletedCart.productId);

    res.json(deletedCart);
  } catch (err) {
    next(err);
  }
};

export default { browse, update, remove };