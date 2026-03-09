require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const errormiddleware = require("./Middlewares/errormiddleware");
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(express.json());
const PORT = process.env.PORT;
const Mongo_Url = mongoose.connect("mongodb://127.0.0.1:27017/MicroGoals")
.then(()=>console.log("MONGODB connected"))
.catch((err)=>console.log(err));
const authRoute = require("./Router/AuthRouter");
const GoalRouter = require("./Router/GoalRouter");
//mongoDB connection
app.use("/api/auth",authRoute);
app.use("/api/goals",GoalRouter)
//route
app.use(errormiddleware);
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});

