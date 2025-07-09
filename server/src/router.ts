import express from "express";
import multer from "multer";
import cartActions from "./modules/cart/cartActions";
import orderActions from "./modules/order/orderActions";
import productActions from "./modules/product/productActions";

const router = express.Router();
const upload = multer({ dest: "public/uploads/products" });

router.get("/api/products/search", productActions.browse);

router.post("/api/cart/:userId", cartActions.add);
router.get("/api/cart/:userId", cartActions.read);
router.put(
  "/api/cart/:userId/:productId",
  cartActions.validate,
  cartActions.edit,
);
router.delete("/api/cart/:userId/:productId", cartActions.destroy);

router.post("/api/order/", orderActions.add);

router.get("/api/products", productActions.browse);
router.get("/api/product/:id", productActions.read);
router.get("/api/products/search", productActions.browse);
router.post(
  "/api/products",
  upload.array("images", 3),
  productActions.validate,
  productActions.add,
);
router.put("/api/product/:id", productActions.validate, productActions.edit);
router.delete("/api/product/:id", productActions.destroy);

export default router;
