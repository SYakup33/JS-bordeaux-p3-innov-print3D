import express from "express";
import cartActions from "./modules/cart/cartActions";

const router = express.Router();

router.post("/api/cart/:userId", cartActions.create);

router.get("/api/cart/:userId", cartActions.read);
router.put(
  "/api/cart/:userId/:productId",
  cartActions.validate,
  cartActions.edit,
);
router.delete("/api/cart/:userId/:productId", cartActions.destroy);
import productActions from "./modules/product/productActions";
router.get("/api/products", productActions.browse);

export default router;
