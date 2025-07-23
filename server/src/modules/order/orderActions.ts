import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
import orderRepository from "./orderRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const { products } = req.body;

    await orderRepository.create(userId, products);

    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    next(err);
  }
};

const createCheckoutSession: RequestHandler = async (req, res, next) => {
  try {
    const { totalAmount, successUrl, cancelUrl } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: totalAmount * 100,
            product_data: {
              name: "Votre total à régler",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    res.status(StatusCodes.OK).json({ url: session.url });
  } catch (err) {
    next(err);
  }
};

export default { add, createCheckoutSession };
