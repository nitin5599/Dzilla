import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentId: {
      type: String
    },
    categoryImage: { 
      type: String,
      required : true
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Categories", categorySchema);

export default Category;
