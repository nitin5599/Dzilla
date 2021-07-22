//Connection file to mongo db
import mongoose from "mongoose";
import colors from "colors";
import dotenv from 'dotenv';
dotenv.config();
// const mongoose = require('mongoose')
// const colors = require('colors')
const { DB_URI, DB_NAME } = process.env

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;
