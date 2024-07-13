const {
  createTodos,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  testController,
} = require("../controllers/todoController.js");
const express = require("express");
const requireSignIn = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/createtodos/", requireSignIn, createTodos);
router.get("/getalltodos/", requireSignIn, getAllTodos);
router.get("/todo/:_id/", requireSignIn, getTodoById);
router.put("/todo/:_id/update", requireSignIn, updateTodo);
router.delete("/todo/:_id/delete", requireSignIn, deleteTodo);
router.get("/test", requireSignIn, testController);

module.exports = router;
