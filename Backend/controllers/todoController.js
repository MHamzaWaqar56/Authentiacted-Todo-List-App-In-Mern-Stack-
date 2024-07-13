const todoSchema = require("../models/todoModel.js");

// create todo

const createTodos = async (req, res) => {
  try {
    const { name, description } = req.body;

    // validation
    if (!name || !description) {
      return res
        .status(400)
        .send({ success: false, error: "Fields are required..." });
    }

    const newTodo = new todoSchema({
      name,
      description,
    });

    const savedTodo = await newTodo.save();

    res.status(200).send({ success: true, message: "Todo Saved.", savedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Something went wrong..." });
  }
};

// get all todos
const getAllTodos = async (req, res) => {
  try {
    const getTodos = await todoSchema.find();
    res
      .status(200)
      .send({ success: true, message: "Get All Todos...", data: getTodos });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Something went wrong..." });
  }
};

// get single todo
const getTodoById = async (req, res) => {
  try {
    const { _id } = req.params;

    const todo = await todoSchema.findById(_id);
    console.log("Todo:", todo);

    if (!todo) {
      res.status(400).send({ success: false, error: "Todo Not Found..." });
    }

    res
      .status(200)
      .send({ success: true, message: "Todo is Here", data: todo });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Something went wrong..." });
  }
};

// update todos
const updateTodo = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .send({ success: false, error: "Fields are required..." });
    }
    const updatedTodo = await todoSchema.findByIdAndUpdate(_id, {
      name,
      description,
    });
    res.status(200).send({
      success: true,
      message: "Here is Updated Todo",
      data: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Something went wrong..." });
  }
};

// delete todo
const deleteTodo = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteTodo = await todoSchema.findByIdAndDelete(_id);
    res
      .status(200)
      .send({ success: true, message: "Todo Deleted Successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Something went wrong" });
  }
};

// test controller
const testController = (req, res) => {
  res.send("Test completed successfully...");
};

module.exports = {
  getAllTodos,
  testController,
  getTodoById,
  updateTodo,
  deleteTodo,
  createTodos,
};
