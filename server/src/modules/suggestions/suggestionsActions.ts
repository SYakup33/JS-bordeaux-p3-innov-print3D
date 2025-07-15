import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import suggestionsRepository from "./suggestionsRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (Number.isNaN(productId)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Identifiant du produit doit être un nombre" });
      return;
    }
    const product = await suggestionsRepository.findById(productId);

    const priceMinMax = 0.4;
    const SuggestedProducts = await suggestionsRepository.findBysuggestions({
      categoryId: product.category_id,
      currentId: productId,
      minPrice: product.price * (1 - priceMinMax),
      maxPrice: product.price * (1 + priceMinMax),
    });

    res.status(StatusCodes.OK).json({ product, SuggestedProducts });
  } catch (err) {
    next(err);
  }
};

export default { read };
