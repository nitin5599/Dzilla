import Product from "../models/productModel.js";
// import asyncHandler from "express-async-handler";

const createProduct = async (req, res) => {
   console.log('req.body', req.body)
   console.log('req.file', req.file)

   const {filename} = req.file
   const {name, description, cashback} = req.body

   try {
      let product = new Product();
      
      product.fileName = filename;
      product.name = name;
      product.cashback = cashback;
      product.description = description;

      await product.save();

      res.json({
         successMessage: `${name} is created`,
         product
      })

   } catch (error) {
      console.log('ProductController create product Error - ', error)
      res.status(500).json({
         errorMessage: 'error 500, please try again!'
      })
   }
}

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

export {createProduct, getProduct}