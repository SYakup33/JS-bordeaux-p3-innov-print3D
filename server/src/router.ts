import express from "express";

const router = express.Router();

import productListActions from "./modules/productList/productListActions";

router.get("/products", productListActions.browse);

export default router;
