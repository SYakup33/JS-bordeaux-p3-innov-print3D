import type { RequestHandler } from "express";

import cartRepository from "./cartRepository";

const readUserCartProducts: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);

    if (Number.isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: "User ID invalide",
      });
      return;
    }

    const cartProducts = await cartRepository.findUserCartProducts(userId);

    const totalQuantity = cartProducts.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalPrice = cartProducts.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    res.json({
      data: cartProducts,
      totalProducts: cartProducts.length,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice.toFixed(2),
      userId: userId,
    });
  } catch (err) {
    next(err);
  }
};

export default { readUserCartProducts };
