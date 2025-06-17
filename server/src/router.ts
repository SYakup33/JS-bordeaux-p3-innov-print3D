import express from "express";

const router = express.Router();

import productActions from "./modules/product/productActions";
router.get("/api/products", productActions.browse);

export default router;
