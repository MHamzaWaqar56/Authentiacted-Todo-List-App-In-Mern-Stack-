import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  todo: [],
  loading: false,
  error: "",
};

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (body, { getState }) => {
    const state = getState();
    const token = state.user.token;
    // console.log("Token:", token);
    const res = await fetch("http://localhost:4000/todolist/createtodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);

// get all todos
export const getAllTodos = createAsyncThunk(
  "todo/getAllTodos",
  async (body) => {
    const res = await fetch("http://localhost:4000/todolist/getAllTodos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  }
);
// delete todo
export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (_id) => {
  const res = await fetch(`http://localhost:4000/todolist/todo/${_id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("userToken")}`,
    },
  });
  const data = await res.json();
  return data;
});
// update todo
export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ _id, body }) => {
    const res = await fetch(
      `http://localhost:4000/todolist/todo/${_id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(body),
      }
    );
    const data = res.json();
    return data;
  }
);

const todoSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { error, message, savedTodo } = payload;
        if (error) {
          state.error = error;
        } else {
          state.todo.push(savedTodo);
          state.message = message;
        }
      })
      .addCase(createTodo.rejected, (state) => {
        state.loading = false;
        state.error = "Todo Creation Failed...";
      })
      //   Get All Todos
      .addCase(getAllTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTodos.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (Array.isArray(payload.data)) {
          state.todo = payload.data;
        } else {
          state.error = "Unexpected data format";
        }
      })
      .addCase(getAllTodos.rejected, (state) => {
        state.loading = false;
        state.error = "Error while getting all todos....";
      })
      //   delete todos
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todo = state.todo.filter((todo) => todo._id !== action.meta.arg);
        // console.log("DeleteTodoSlice:", action.meta.arg);
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.loading = false;
        state.error = "Error while deleting todo";
      })
      //   update todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        console.log("updatedcode:", action.payload.data._id);
        const index = state.todo.findIndex(
          (todo) => todo._id === action.payload.data._id
        );
        console.log("Index:", index);
        if (index !== -1) {
          state.todo[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state) => {
        state.loading = false;
        state.error = "Error while updating todo";
      });
  },
});

export default todoSlice.reducer;
