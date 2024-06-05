const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userDb = require("./models/user");
const todoDb = require("./models/todo");
const userRouter = require("./routers/user");
const todoRouter = require("./routers/todo");
const { checkForAuthenticationCookies } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const PORT = 3000;
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true, // Set retryWrites as a boolean
  })
  .then(() => {
    console.log("mongoose connected!--");
  })
  .catch((err) => {
    console.log(err, "Some ERROR TO CONNECT MONGOOSE");
  });
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(checkForAuthenticationCookies("token"));
app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.get("/", async (req, res) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 4;
    let skip = (page - 1) * limit;
    const allTodo = await todoDb
      .find({
        createdBy: req.user,
      })
      .skip(skip)
      .limit(limit);
    return res.json({
      allTodo,
    });
  } catch (error) {
    return res.json({
      msg: "please login again",
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
