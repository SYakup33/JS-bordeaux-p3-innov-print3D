import express from "express";
import "dotenv/config";
import Stripe from "stripe";
import cartActions from "./modules/cart/cartActions";
import orderActions from "./modules/order/orderActions";
import productActions from "./modules/product/productActions";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

router.get("/api/products/search", productActions.browse);

router.post("/api/cart/:userId", cartActions.add);
router.get("/api/cart/:userId", cartActions.read);
router.put(
  "/api/cart/:userId/:productId",
  cartActions.validate,
  cartActions.edit,
);
router.delete("/api/cart/:userId/:productId", cartActions.destroy);
router.post(
  "/api/order/create-checkout-session",
  orderActions.createCheckoutSession,
);

router.post("/api/order/", orderActions.add);
router.get("/api/products", productActions.browse);
router.get("/api/product/:id", productActions.read);
router.get("/api/products/search", productActions.browse);

export default router;
