import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export default store;



const type RootState = ReturnType(typeof store.getState() )
const type AppDispatch = typeof store.dispatch