import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
// import cloudinary  from "../utils/cloudinary";

// Create a new product
const createProduct = async (req, res) => {
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   console.log('req.body', req.body)
   
   const {name, description, cashback, productImage} = req.body
   
   if(!name || !description || !cashback || !productImage){
      return  res.status(422).json({error:"Plase add all the fields"})
   }

   const product = new Product({
      name,
      description,
      cashback,
      fileName:productImage,
      status: 'All',
      fav: false
   })
   product.save().then(()=>{
         res.json({
            successMessage: `${name} is created`,
            product})
   })
   .catch(err=>{
         console.log(err)
         res.status(500).json({
            errorMessage: 'error 500, please try again!'
         })
   })

}

// Get all products
const getProduct = async (req, res) => {
    try{ 
      const products = await Product.find({})
      res.json(products)
    } catch (error) {
      console.log('ProductController get Products Error - ', error)
      res.status(500).json({
         errorMessage: 'error 500, please try again!'
      })
   }  
}


//@description     Delete single Product
//@route           DELETE /api/product/:id
//@access          Private

const deleteProduct = asyncHandler(async (req, res) => {
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   
   const id = req.params.id;
    try {
      const result = await Product.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Product does not exist.');
      }
      res.send(result);
      console.log('Product deleted successfully !') 
    } catch (error) {
      console.log(error.message);
    }

 });
 
 // @desc    Update a product
 // @route   PUT /api/product/:id
 // @access  Private

 const updateProduct = asyncHandler(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  const {name, description, cashback} = req.body
   
  await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {        
        console.log(error)
        return next(error);
      } else {
        res.status(204)
        res.json()
        console.log('Product updated successfully !') 
        }
    }) 
 });

export {createProduct, getProduct, updateProduct, deleteProduct}