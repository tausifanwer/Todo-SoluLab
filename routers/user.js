const { Router } = require("express");
const router = Router();
const { handlePostSignup, handlePostSignin } = require("../controllers/user");

router.post("/signup", handlePostSignup);
router.post("/signin", handlePostSignin);

module.exports = router;
