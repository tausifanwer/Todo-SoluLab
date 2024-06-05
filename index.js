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

mongoose
  .connect("mongodb://127.0.0.1:27017/Todo")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
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
