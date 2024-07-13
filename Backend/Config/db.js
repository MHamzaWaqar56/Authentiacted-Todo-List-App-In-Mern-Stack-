const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const connDb = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Connected to MongoDB Database ${connDb.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`Error in MongoDB ${error} `.bgRed.white);
  }
};

module.exports = connectDB;
