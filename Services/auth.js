const JWT = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
  };
  const token = JWT.sign(payload, secret, {
    expiresIn: "1d",
  });

  console.log("crete token");
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  console.log("validate token");
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
