import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
import orderRepository from "./orderRepository";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

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
    const userId = Number(req.params.userId);
    const { products, totalAmount, successUrl, cancelUrl } = req.body;

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
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId.toString(),
      },
    });

    const orderId = await orderRepository.createPendingOrder(
      userId,
      products,
      session.id,
    );

    res.status(StatusCodes.OK).json({
      url: session.url,
      orderId,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("❌ Erreur création session:", err);
    next(err);
  }
};

const handleStripeWebhook: RequestHandler = async (req, res, next) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig as string,
      endpointSecret,
    );
  } catch (err) {
    console.error("❌ Erreur signature webhook:", err);
    return res.status(400).send("Webhook signature verification failed");
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const sessionCompleted = event.data.object as Stripe.Checkout.Session;

        const confirmed = await orderRepository.confirmOrder(
          sessionCompleted.id,
        );
        break;
      }

      case "checkout.session.expired": {
        const sessionExpired = event.data.object as Stripe.Checkout.Session;

        await orderRepository.cancelPendingOrder(sessionExpired.id);
        break;
      }

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("❌ Erreur traitement webhook:", err);
    next(err);
  }
};

export default { add, createCheckoutSession, handleStripeWebhook };
