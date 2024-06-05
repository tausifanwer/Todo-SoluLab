const { Router } = require("express");
const {
  handlePostCreate,
  handlePutUpdate,
  handleDelete,
  handleSearch,
} = require("../controllers/todo");
const router = Router();

router.post("/create", handlePostCreate);
router.get("/search", handleSearch);
router.put("/update/:id", handlePutUpdate);
router.delete("/delete/:id", handleDelete);

module.exports = router;
