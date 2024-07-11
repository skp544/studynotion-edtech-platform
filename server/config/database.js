import mongoose from "mongoose";

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database is connected!");
    })
    .catch((err) => {
      console.log("Failed to connect to database!");
      console.log(err);
      process.exit(1);
    });
};

export default connectToDB;
