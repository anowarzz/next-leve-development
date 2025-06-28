import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "./../../../types";


interface InitialState {
  task: ITask[];
}

const initialState: InitialState = {
  task: [
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
      priority: "High",
    },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
