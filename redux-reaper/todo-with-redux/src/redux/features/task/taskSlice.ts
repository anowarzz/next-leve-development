import type { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { type ITask } from "./../../../types";

interface InitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  tasks: [
    {
      id: "5434fdfdf34343",
      title: "initialize frontend",
      description: "Create Home page and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "High",
    },
    {
      id: "5434fdfdf34344",
      title: "create github repo",
      description: "Create and connect with github",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "Medium",
    },
  ],
  filter: "all",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const selectTasks = (state: RootState) => {
  return state.todo.tasks;
};



export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export default taskSlice.reducer;
