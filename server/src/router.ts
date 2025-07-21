import express from "express";
import adminOrdersActions from "./modules/adminOrders/adminOrdersActions";
import "dotenv/config";
import authActions from "./modules/auth/authActions";
import cartActions from "./modules/cart/cartActions";
import orderActions from "./modules/order/orderActions";
import productActions from "./modules/product/productActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/products", productActions.browse);

router.get("/api/products/search", productActions.browse);
router.get("/api/product/:id", productActions.read);

router.get("/api/products/moments", productActions.readTrendProducts);

router.post("/api/cart/:userId", cartActions.validate, cartActions.add);

router.post(
  "/api/users",
  userActions.validate,
  authActions.hashPassword,
  userActions.add,
);

router.post("/api/login", authActions.login);

router.put("/api/product/:productId/trend", productActions.updateTrendProducts);

router.use(authActions.verifyToken);

router.get(
  "/api/admin/orders",
  authActions.isAdmin,
  adminOrdersActions.readAll,
);
router.put(
  "/api/admin/order/:orderId",
  authActions.isAdmin,
  adminOrdersActions.updateStatus,
);
router.get(
  "/api/admin/orders/unread",
  authActions.isAdmin,
  adminOrdersActions.unreadOrders,
);
router.put(
  "/api/admin/order/read/:orderId",
  authActions.isAdmin,
  adminOrdersActions.isRead,
);

router.get("/api/cart/:userId", cartActions.read);
router.post(
  "/api/order/create-checkout-session",
  orderActions.createCheckoutSession,
);
router.post("/api/order/:userId", orderActions.add);
router.put("/api/cart/:userId", cartActions.validate, cartActions.edit);

router.delete("/api/cart/:userId/:productId", cartActions.destroy);

export default router;
