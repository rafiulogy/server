import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { authRoutes, uploadRoutes } from "./routes";
import cookieParser from "cookie-parser";
import { User } from "./entity/User";
import path from "path";
import corsOptions from "./config/corsOptions";

const app = express();
//
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
// app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chart-data", chartRoutes);
// app.use("/api/data", reportDataRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"), (error) => {
    res.status(500).json({ message: "Not found!" });
  });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(5000, () => {
      console.log("Server running....");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

export default app;
