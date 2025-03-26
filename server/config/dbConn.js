const mongoose = require('mongoose');
require("dotenv").config()

async function connectDB() {
  try {
    await mongoose.connect(process.env.CONECTION_URL);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
}

module.exports = connectDB;