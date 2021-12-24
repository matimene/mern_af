import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

// Function to connect to db
const connectDb = () => {
  return mongoose.connect(
    process.env.MONGODB_URI,
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log("Connection to DB failed.");
      } else {
        console.log("DB connection successful.");
      }
    }
  );
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

export {connectDb}
