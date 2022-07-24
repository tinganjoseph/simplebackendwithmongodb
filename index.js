import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();

//middleware it help logout http request from the console
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/users", userRouter); // http://localhost:7000/users/signup


const port = process.env.PORT || 7000;

//SETTING UP MANGO DB AT THE BACKEND
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));