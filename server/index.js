import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/database.js";
import authRoute from "./routes/auth-route.js";
import categoryRoute from "./routes/category-route.js";
import cloudinaryConnect from "./config/cloudinary.js";
import courseRoute from "./routes/course-route.js";
import fileUpload from "express-fileupload";
import sectionRoute from "./routes/section-route.js";
import subSectionRoute from "./routes/sub-section-route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// db connection

connectToDB();
// cloudinary connection

cloudinaryConnect();

/// connections

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/section", sectionRoute);
app.use("/api/v1/sub-section", subSectionRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is started at PORT ${PORT}`);
});
