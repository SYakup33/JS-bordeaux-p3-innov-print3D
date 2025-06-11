import express from "express";

const router = express.Router();

import productListActions from "./modules/productList/productListActions";
router.get("/products", productListActions.browse);

import imageActions from "./modules/image/imageActions";
router.get("/images", imageActions.browse);

import categoryActions from "./modules/category/categoryActions";
router.get("/categories", categoryActions.browse);

export default router;
