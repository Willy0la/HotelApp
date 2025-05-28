import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import EventEmitter from "events";
import connectDB from "./config/database";
import errorHandler from "./middleWare/errorHandler";
import router from "./module/index.route";
dotenv.config();


 connectDB();


const app = express();
const PORT = process.env.PORT || 5003;


EventEmitter.defaultMaxListeners = 20;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));



app.use("/app/", router)
 app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});