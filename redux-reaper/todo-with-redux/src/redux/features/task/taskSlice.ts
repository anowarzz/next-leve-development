import type { RootState } from "@/redux/store";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { type ITask } from "./../../../types";

type TPriority = "all" | "high" | "medium" | "low";

interface InitialState {
  tasks: ITask[];
  filter: TPriority;
}

const initialState: InitialState = {
  tasks: [
    {
      id: "1dfdfdfdfdfr343",
      title: "Sample Task 1",
      description: "This is a sample task",
      dueDate: "2025-12-31",
      priority: "medium",
      isCompleted: false,
    },
  ],
  filter: "all",
};

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
  return { id: nanoid(), isCompleted: false, ...taskData };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // add a task
    addTask: (state, action: PayloadAction<ITask>) => {
      const taskData = createTask(action.payload);

      state.tasks.push(taskData);
    },

    // toogle task completion status
    toogleCompleteState: (state, action: PayloadAction<string>) => {
      console.log(action);

      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },

    // delete a TaskCard
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    // edit a Task
    editTask: (state, action: PayloadAction<ITask>) => {
      const { id, title, description, dueDate, priority } = action.payload;

      state.tasks = state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
              dueDate,
              priority,
            }
          : task
      );
    },
    // filter TaskCard
    updateFilter: (state, action: PayloadAction<TPriority>) => {
      state.filter = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;

  if (filter === "low") {
    return state.todo.tasks.filter((task) => task.priority === "low");
  } else if (filter === "medium") {
    return state.todo.tasks.filter((task) => task.priority === "medium");
  } else if (filter === "high") {
    return state.todo.tasks.filter((task) => task.priority === "high");
  } else {
    return state.todo.tasks;
  }
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export const {
  addTask,
  toogleCompleteState,
  editTask,
  deleteTask,
  updateFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
