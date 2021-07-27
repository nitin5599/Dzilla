import express from "express";
import { addCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";
// import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../assets/uploads/")
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname)
//     },
// })

// const upload = multer({storage: storage})

const router = express.Router();

//Create a new category
router.post("/create", addCategory);

//Get all categories
router.get("/", getCategories);

//Update a category by id
router.patch('/:id', updateCategory);

//Delete a catgory by id
router.delete('/:id', deleteCategory);

export default router;
