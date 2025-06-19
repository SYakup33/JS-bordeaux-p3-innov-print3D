import express from "express";

const router = express.Router();

import cartActions from "./modules/cart/cartActions";

router.get("/api/cart", cartActions.browse);
router.post("/api/cart", cartActions.add);
router.get("/api/cart/user/:userId", cartActions.browseCartWithProducts);

export default router;
