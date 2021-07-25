import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
import slugify from 'slugify';
import multer from 'multer'
import shortid from "shortid";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../assets/uploads/")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    },
})

const upload = multer({storage: storage})

function createCategories(categories, parentId = null){
    const ctgList = []
    let category;
    if(parentId==null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let ctg of category) {
        ctgList.push({
            _id: ctg._id,
            name: ctg.name,
            slug: ctg.slug,
            children: createCategories(categories, ctg._id)
        });        
    }

    return ctgList;
}

// post a category
const createCategory = asyncHandler((upload.single("categoryImage")), (req, res) => {
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
    
})

// fetch all categories
const getCategories = asyncHandler(async (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error) 
            return res.status(400).json({error})
        if(categories){
            const ctgList = createCategories(categories)
            res.status(200).json({ctgList});
        }
    })
    
});

// update category

const updateCategories = asyncHandler((upload.single("categoryImage")), (req, res) => {
    
    const { _id, name, parentId, categoryImage } = req.body;
    const updatedCategories = [];
    
    if (name instanceof Array) {

      for (let i = 0; i < name.length; i++) {
        const category = {
          name: name[i],
        };
        if (parentId[i] !== "") {
          category.parentId = parentId[i];
        }
  
        const updatedCategory = Category.findOneAndUpdate(
          { _id: _id[i] },
          category,
          { new: true }
        );
        updatedCategories.push(updatedCategory);
      }

      return res.status(201).json({ updateCategories: updatedCategories });
    
    } else {

      const category = {
        name,
        type,
      }

      if (parentId !== "") {
        category.parentId = parentId;
      }
      
      const updatedCategory = Category.findOneAndUpdate({ _id }, category, {
        new: true,
      });
      return res.status(201).json({ updatedCategory });
    }

  }
)

// delete category

const deleteCategories = asyncHandler(async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
      const deleteCategory = await Category.findOneAndDelete({
        _id: ids[i]._id,
        createdBy: req.user._id,
      });
      deletedCategories.push(deleteCategory);
    }
  
    if (deletedCategories.length == ids.length) {
      res.status(201).json({ message: "Categories removed" });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
)

export {createCategory, getCategories}