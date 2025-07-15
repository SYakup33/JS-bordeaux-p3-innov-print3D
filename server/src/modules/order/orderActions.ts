import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
import orderRepository from "./orderRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = 2;
    const { products } = req.body;

    await orderRepository.create(userId, products);

    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    next(err);
  }
};

const createCheckoutSession: RequestHandler = async (req, res, next) => {
  try {
    const { totalAmount } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "eur",
            unit_amount: totalAmount * 100,
            product_data: {
              name: "Vos articles",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/order/:id/confirmation",
      cancel_url: "http://localhost:3000/order/:id/paymentfail",
    });
    res.status(StatusCodes.OK).json({ url: session.url });
  } catch (err) {
    next(err);
  }
};

export default { add, createCheckoutSession };
