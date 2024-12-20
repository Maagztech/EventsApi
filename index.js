import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import "./config/database.js";
import routes from "./routes/index.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use("/api", routes);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
