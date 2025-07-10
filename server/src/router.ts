import express from "express";
import authActions from "./modules/auth/authActions";
import cartActions from "./modules/cart/cartActions";
import orderActions from "./modules/order/orderActions";
import productActions from "./modules/product/productActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/products", productActions.browse);
router.get("/api/product/:id", productActions.read);
router.get("/api/products/search", productActions.browse);

router.post(
  "/api/users",
  userActions.validate,
  authActions.hashPassword,
  userActions.add,
);

router.get("/api/cart/:userId", cartActions.read);
router.put(
  "/api/cart/:userId/:productId",
  cartActions.validate,
  cartActions.edit,
);
router.delete("/api/cart/:userId/:productId", cartActions.destroy);
router.post("/api/order/", orderActions.add);

export default router;
