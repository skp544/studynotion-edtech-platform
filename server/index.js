import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/database.js";
import authRoute from "./routes/auth-route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection

connectToDB();

/// connections

app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is started at PORT ${PORT}`);
});
