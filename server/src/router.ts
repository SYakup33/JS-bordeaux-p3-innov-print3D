import express from "express";

const router = express.Router();

import productActions from "./modules/product/productActions";
router.get("/api/products", productActions.browse);
router.get("/api/products/:id", productActions.read);

export default router;
