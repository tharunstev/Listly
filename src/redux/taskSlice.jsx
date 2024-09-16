import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  const response = await axios.get("https://dummyjson.com/todos");
  return response.data.todos;
});


export const addTask = createAsyncThunk("tasks/addTask", async (newTask) => {
  const response = await axios.post("https://dummyjson.com/todo/add", newTask, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
});


export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId) => {
  await axios.delete(`https://dummyjson.com/todo/${taskId}`);
  return taskId;
});


export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, completed, todo }) => {
    const response = await axios.put(`https://dummyjson.com/todos/${taskId}`, {
      completed,
      todo, 
    });
    return response.data;
  }
);


const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      });
  },
});

export default taskSlice.reducer;
