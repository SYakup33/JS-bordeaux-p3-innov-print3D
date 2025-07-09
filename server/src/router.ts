import express from "express";
import authActions from "./modules/auth/authActions";
import cartActions from "./modules/cart/cartActions";
import orderActions from "./modules/order/orderActions";
import productActions from "./modules/product/productActions";

const router = express.Router();

router.get("/api/products/search", productActions.browse);

router.post("/api/cart/:userId", cartActions.add);

router.post("/api/order/", orderActions.add);
router.get("/api/products", productActions.browse);
router.get("/api/product/:id", productActions.read);
router.get("/api/products/search", productActions.browse);

router.post("/api/login", authActions.login);
router.get("/api/cart/:userId", cartActions.read);

router.use(authActions.verifyToken);

router.put(
  "/api/cart/:userId/:productId",
  cartActions.validate,
  cartActions.edit,
);

router.delete("/api/cart/:userId/:productId", cartActions.destroy);

export default router;
