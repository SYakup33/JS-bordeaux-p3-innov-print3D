import express from "express";
import cartActions from "./modules/cart/cartActions";

const router = express.Router();

router.get("/api/cart/:userId", cartActions.read);
router.put(
  "/api/cart/:userId/:productId",
  cartActions.validate,
  cartActions.edit,
);
router.delete("/api/cart/:userId/:productId", cartActions.destroy);

export default router;
