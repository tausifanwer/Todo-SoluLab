const { Schema, model } = require("mongoose");
const { createTokenForUser } = require("../Services/auth");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User Not Found");

    if (password !== user.password) {
      throw new Error("Incorrect Password");
    } else {
      const token = createTokenForUser(user);
      return token;
    }
  }
);

const User = model("user", userSchema);

module.exports = User;
