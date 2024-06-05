const userDb = require("../models/user");

async function handlePostSignup(req, res) {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ msg: "Please enter all Fields" });
    const user = await userDb.create({
      fullName,
      email,
      password,
    });
    return res.status(201).json({
      msg: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

async function handlePostSignin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await userDb.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).json({
      msg: "userLogin",
    });
  } catch (error) {
    return res.json({
      errorSignIn: "Invalid email or password",
    });
  }
}

module.exports = {
  handlePostSignup,
  handlePostSignin,
};
