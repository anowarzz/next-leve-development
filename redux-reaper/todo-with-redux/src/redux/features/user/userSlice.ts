import type { IUser } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface IUserState {
  users: IUser[];
}

const initialState: IUserState = {
  users: [
    {
      id: "1",
      name: "John Doe",
      isActive: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      isActive: true,
    },
    {
      id: "3",
      name: "Bob Wilson",
      isActive: false,
    },
  ],
};

type DraftUser = Pick<IUser, "name">;

const createUser = (userData: DraftUser): IUser => {
  return { id: nanoid(), isActive: true, ...userData };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<DraftUser>) => {
      const userData = createUser(action.payload);
      state.users.push(userData);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    toggleActiveState: (state, action: PayloadAction<string>) => {
      const user = state.users.find((user) => user.id === action.payload);
      if (user) {
        user.isActive = !user.isActive;
      }
    },
  },
});

export const { addUser, deleteUser, toggleActiveState } = userSlice.actions;

export const selectUsers = (state: RootState) => {
  return state.user.users;
};

export default userSlice.reducer;
