import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    cashback: { 
        type: Number, 
        required: true 
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    fileName:{
        type: String,
        required: true
    }
}, { timestamps: true });


const Product = mongoose.model('Products', productSchema);
export default Product;