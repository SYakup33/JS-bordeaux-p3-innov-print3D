import type { RequestHandler } from "express";

// Import access to data
import cartRepository from "./cartRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const cart = await cartRepository.findAll();

    // Respond with the items in JSON format
    res.json(cart);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const cartId = Number(req.params.id);
    const cart = await cartRepository.find(cartId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (cart == null) {
      res.sendStatus(404);
    } else {
      res.json(cart);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newCart = {
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      price: req.body.price,
    };

    // Create the item
    const insertId = await cartRepository.create(newCart);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browseCartWithProducts: RequestHandler = async (req, res, next) => {
  try {
    // Extract userID from params
    const userId = Number(req.params.userId);

    if (Number.isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: "User ID invalide",
      });
      return;
    }

    //Fetch cart items with product details
    const cartWithProducts = await cartRepository.readCartWithProducts(userId);

    //Calculate totals
    const totalQuantity = cartWithProducts.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    const totalPrice = cartWithProducts.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );

    // Respond with the items in JSON format
    res.json({
      success: true,
      data: cartWithProducts,
      totalProducts: cartWithProducts.length,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice.toFixed(2),
      userId: userId,
    });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, browseCartWithProducts };
