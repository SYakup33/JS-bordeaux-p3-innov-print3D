import express from "express";
import cartActions from "./modules/cart/cartActions";

const router = express.Router();

router.get("/api/cart/:userId", cartActions.browse)
router.put("/api/cart/:userId/:productId", cartActions.update)
router.delete("/api/cart/:userId/:productId", cartActions.remove)

export default router;
