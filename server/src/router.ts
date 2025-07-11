import path from "node:path";
import express from "express";
import multer from "multer";
import cartActions from "./modules/cart/cartActions";
import orderActions from "./modules/order/orderActions";
import productActions from "./modules/product/productActions";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/products");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const customName = `produit-${timestamp}-${basename}${ext}`;
    cb(null, customName);
  },
});

const upload = multer({ storage });
const productImagesUpload = upload.any();

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
  productImagesUpload,
  productActions.validate,
  productActions.add,
);
router.put("/api/product/:id", productImagesUpload, productActions.edit);
router.delete("/api/product/:id", productActions.destroy);

export default router;
