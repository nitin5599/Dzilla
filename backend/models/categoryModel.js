import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // slug: {
    //   type: String,
    //   // required: true,
    //   // unique: true,
    // },
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
