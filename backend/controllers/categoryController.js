import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";
// import slugify from 'slugify';
// import multer from 'multer'
// import shortid from "shortid";

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "../assets/uploads/")
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.originalname)
//     },
// })

// const upload = multer({storage: storage})

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
        // slug: ctg.slug,
        children: createCategories(categories, ctg._id)
      });        
    }

    return ctgList;
}

// post a category
const addCategory = async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    console.log('req.body', req.body)
   
    const {name, parentId, categoryImage} = req.body
   
    // const ctgObj = {
    //     name: req.body.name,
    //     categoryImage: req.body.image
    //     // slug: slugify(req.body.name),
    // }
    if(!name || !categoryImage){
      return res.status(422).json({error:"Plase add all the fields"})
    }

  const ctgExists = await Category.findOne({ name });

  if (ctgExists) {
    res.status(404);
    res.json({
      errorMessage: 'category already exists!'
    })
    throw new Error("User already exists");
  }

    const category = new Category({
      name,
      parentId,
      categoryImage
    })

    // if (req.file) {
    //     ctgObj.categoryImage = "/public/" + req.file.filename;
    // }

    // if (!ctgObj.name) {
    //     res.status(400);
    //     throw new Error("Please Fill all the feilds");
    // } else {
    
    if(parentId){
      category.parentId = parentId;
    }
    
    //const cat = new Category(ctgObj);
    
    category.save().then(()=>{
      res.json({
        successMessage: `${name} is created`,
        category
      })
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({
        errorMessage: 'error 500, please try again!'
      })
    })

        // cat.save((error, category) => {
        //     if(error) 
        //         return res.status(400).json({error})
        //     if(category){
        //         return res.status(201).json({category})
        //     }
        // })     

    // }
    
}

// fetch all categories
const getCategories = asyncHandler(async (req, res) => {  
  try{ 
    const categories = await Category.find({})
    res.json(categories)
  } catch (error) {
    console.log('CategoryController get Category Error - ', error)
    res.status(500).json({
       errorMessage: 'error 500, please try again!'
    })
  }  
  // Category.find({})
  // .exec((error, categories) => {
  //     if(error) 
  //         return res.status(400).json({error})
  //     if(categories){
  //         const ctgList = createCategories(categories)
  //         res.status(200).json({ctgList});
  //     }
  // })
    
});

// update category

const updateCategory = asyncHandler(async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
  // const { _id, name, parentId, categoryImage } = req.body;
 
  await Category.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {        
      console.log(error)
      return next(error);
    } else {
      res.status(204)
      res.json({
        successMessage: `Category updated successfully !`,
      })
      console.log('Category updated successfully !') 
      }
  })  
    // const updatedCategories = [];
    
    // if (name instanceof Array) {

    //   for (let i = 0; i < name.length; i++) {
    //     const category = {
    //       name: name[i],
    //     };
    //     if (parentId[i] !== "") {
    //       category.parentId = parentId[i];
    //     }
  
    //     const updatedCategory = Category.findOneAndUpdate(
    //       { _id: _id[i] },
    //       category,
    //       { new: true }
    //     );
    //     updatedCategories.push(updatedCategory);
    //   }

    //   return res.status(201).json({ updateCategories: updatedCategories });
    
    // } else {

    //   const category = {
    //     name,
    //     type,
    //   }

    //   if (parentId !== "") {
    //     category.parentId = parentId;
    //   }
      
    //   const updatedCategory = Category.findOneAndUpdate({ _id }, category, {
    //     new: true,
    //   });
    //   return res.status(201).json({ updatedCategory });
    // }

  }
)

// delete category

const deleteCategory = asyncHandler(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  const id = req.params.id;
    try {
      const result = await Category.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Category does not exist.');
      }
      res.send(result);
      console.log('Category deleted successfully !') 
    } catch (error) {
      console.log(error.message);
  }

  //   const { ids } = req.body.payload;
  //   const deletedCategories = [];
  //   for (let i = 0; i < ids.length; i++) {
  //     const deleteCategory = await Category.findOneAndDelete({
  //       _id: ids[i]._id,
  //       createdBy: req.user._id,
  //     });
  //     deletedCategories.push(deleteCategory);
  //   }
  
  //   if (deletedCategories.length == ids.length) {
  //     res.status(201).json({ message: "Categories removed" });
  //   } else {
  //     res.status(400).json({ message: "Something went wrong" });
  //   }
  }
)

export {addCategory, getCategories, deleteCategory, updateCategory}