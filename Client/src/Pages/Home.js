import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import styled from "styled-components";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../ReduxToolKit/todoSlice";

const Home = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  const dispatch = useDispatch();

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingTodo) {
      const result = await dispatch(
        updateTodo({ _id: editingTodo, body: { name, description } })
      );
      if (result.payload.success) {
        alert(result.payload.message);
        setEditingTodo(null);
      } else {
        alert(result.payload.error);
      }
    } else {
      const result = await dispatch(createTodo({ name, description }));
      if (result.payload.success) {
        alert(result.payload.message);
      } else {
        alert(result.payload.error);
      }
    }
    setName("");
    setDescription("");
  };

  const handleDelete = async (_id) => {
    const result = await dispatch(deleteTodo(_id));

    if (result.payload.message) {
      alert(result.payload.message);
    } else {
      alert(result.payload.error);
    }
  };

  const handleUpdate = async (todo) => {
    setEditingTodo(todo._id);
    setName(todo.name);
    setDescription(todo.description);
  };

  const { todo } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [name, description]);

  return (
    <Layout title={"Home - TodoList"}>
      <Wrapper>
        <div className="main-div">
          <br />
          <div className="container">
            <div className="inner-div">
              <br />
              <div className="create-list">
                <input
                  type="text"
                  placeholder="Enter Task Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Task Description"
                  value={description}
                  onhange={(e) => setDescription(e.target.value)}
                />
                <button className="btn" onClick={handleSave}>
                  {editingTodo ? "Update" : "Save"}
                </button>
              </div>

              <br />
              <hr />
              <hr />
              <br />

              <div className="listed-div">
                {Array.isArray(todo) &&
                  todo.map((todoElem) => (
                    <>
                      <div className="saved-lists" key={todoElem._id}>
                        <div className="list">
                          <h2>{todoElem.name}</h2>
                          <p>{todoElem.description}</p>
                        </div>
                        <div className="todo-btns">
                          <button
                            className="edit-btn"
                            onClick={() => handleUpdate(todoElem)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(todoElem._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <br />
                    </>
                  ))}
              </div>

              <br />
            </div>
          </div>
          <br />
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  .main-div {
    width: 100%;
    background-color: #9ff39f;
  }

  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 450px;
  }

  .inner-div {
    position: relative;
    border-radius: 35px;
    z-index: 2;
    background-color: white;
    padding: 10px 50px;
    width: 50%;
  }

  .listed-div {
    width: 100%;
    height: 300px;
    overflow-y: scroll;
  }

  .create-list {
    display: flex;
    justify-content: space-around;
  }

  input {
    width: 220px;
    height: 50px;
    font-size: 18px;
    padding: 10px 7px;
    outline: none;
    border-radius: 7px;
    border: 1px solid #9ff39f;
  }

  .btn {
    background-color: #c593c5;
    font-size: 15px;
    color: white;
    padding: 5px 15px;
    border: none;
    border-radius: 7px;
  }

  .saved-lists {
    display: flex;
    justify-content: space-between;
    background-color: indianred;
    padding: 10px 20px;
    border-radius: 30px;
  }

  .list {
    width: 75%;
  }

  .todo-btns {
    width: 25%;
    display: flex;
    justify-content: space-between;
  }

  button {
    padding: 10px;
    font-size: 18px;
    border: none;
    border-radius: 40px;
    cursor: pointer;
  }

  .edit-btn {
    background-color: #61eb61;
    color: white;
  }

  .delete-btn {
    color: white;
    background-color: red;
  }
`;

export default Home;
