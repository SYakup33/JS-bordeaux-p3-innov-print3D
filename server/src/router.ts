import express from "express";
import authActions from "./modules/auth/authActions";
import cartActions from "./modules/cart/cartActions";
import orderActions from "./modules/order/orderActions";
import productActions from "./modules/product/productActions";
import { productImagesUpload } from "./modules/uploadMulter/uploadMulter";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/products", productActions.browse);
router.get("/api/products/search", productActions.browse);
router.get("/api/product/:id", productActions.read);

router.post("/api/cart/:userId", cartActions.validate, cartActions.add);

router.post(
  "/api/users",
  userActions.validate,
  authActions.hashPassword,
  userActions.add,
);

router.post("/api/login", authActions.login);

router.use(authActions.verifyToken);

router.post("/api/order/", orderActions.add);

router.get("/api/cart/:userId", cartActions.read);
router.put("/api/cart/:userId", cartActions.validate, cartActions.edit);
router.delete("/api/cart/:userId/:productId", cartActions.destroy);

router.post(
  "/api/products",
  productImagesUpload,
  productActions.validate,
  productActions.add,
);
router.put("/api/product/:id", productImagesUpload, productActions.edit);
router.delete("/api/product/:id", productActions.destroy);

export default router;
