import express from "express";

const router = express.Router();

import cartActions from "./modules/cart/cartActions";
router.get("/api/cart/user/:userId", cartActions.readUserCartProducts);

import orderActions from "./modules/order/orderActions";
router.post("/api/order/:userId", orderActions.add);

export default router;
