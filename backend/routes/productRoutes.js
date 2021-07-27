import express from "express";
import { createProduct, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import {upload} from "../middleware/multerMiddleware.js";

const router = express.Router();

// router.post("/create", upload.single('productImage'), createProduct);

//Create a new product
router.post("/create", createProduct);

//Get all products
router.get("/", getProduct);

//Update a product by id
router.patch('/:id', updateProduct);

//Delete a product by id
router.delete('/:id', deleteProduct);

export default router;