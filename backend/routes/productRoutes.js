import express from "express";
import { createProduct, getProduct } from "../controllers/productController.js";
import {upload} from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/create", upload.single('productImage'), createProduct);
router.get("/", getProduct);

export default router;