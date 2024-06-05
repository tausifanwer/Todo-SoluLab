const todoDb = require("../models/todo");

async function handlePostCreate(req, res) {
  try {
    const { title, description, fav } = req.body;
    const todo = await todoDb.create({
      title,
      description,
      fav,
      createdBy: req.user._id,
    });
    return res.json({
      msg: "Created",
      todo,
    });
  } catch (error) {
    return res.json({
      msg: "please login again",
      error: error,
    });
  }
}

async function handlePutUpdate(req, res) {
  try {
    if (!req.user) throw new Error("please login again");
    const { id } = req.params;

    const { title, description, fav } = req.body;

    await todoDb.findByIdAndUpdate(id, {
      title,
      description,
      fav,
    });
    const updated = await todoDb.findById(id);
    if (!updated)
      return res.json({
        msg: "Not Found",
      });
    return res.json({
      msg: "Updated",
      updated,
    });
  } catch (error) {
    return res.json({
      msg: "please login again",
      error: error,
    });
  }
}
async function handleDelete(req, res) {
  try {
    if (!req.user) throw new Error("Please login again");
    const { id } = req.params;
    const de = await todoDb.findByIdAndDelete(id);
    if (!de)
      return res.json({
        msg: "Not found",
      });
    return res.json({
      msg: "Deleted",
    });
  } catch (error) {
    return res.json({
      msg: "please Try Again",
    });
  }
}
async function handleSearch(req, res) {
  try {
    const { title } = req.query;
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 8;
    let skip = (page - 1) * limit;

    const todo = await todoDb
      .find({
        createdBy: req.user._id,
        title: { $regex: title },
      })
      .skip(skip)
      .limit(limit);
    return res.json({
      todo,
    });
  } catch (error) {
    return res.json({
      msg: "please login again",
    });
  }
}

module.exports = {
  handlePostCreate,
  handlePutUpdate,
  handleDelete,
  handleSearch,
};
