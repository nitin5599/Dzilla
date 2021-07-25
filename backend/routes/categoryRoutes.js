import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../assets/uploads/")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    },
})

const upload = multer({storage: storage})

const router = express.Router();

router.post("/create", (upload.single("categoryImage")), (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    const ctgObj = {
        name: req.body.name,
        categoryImage: req.body.image
        // slug: slugify(req.body.name),
    }
    
    if (req.file) {
        ctgObj.categoryImage = "/public/" + req.file.filename;
    }

    if (!ctgObj.name) {
        res.status(400);
        throw new Error("Please Fill all the feilds");
    } else {
        if(req.body.parentId){
            Categories.parentId = req.body.parentId;
        }
        const cat = new Category(ctgObj);
    
        cat.save((error, category) => {
            if(error) 
                return res.status(400).json({error})
            if(category){
                return res.status(201).json({category})
            }
        })     
    }
    
});

router.get("/", getCategories);

export default router;
