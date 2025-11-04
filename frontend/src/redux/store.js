import { configureStore } from "@reduxjs/toolkit";
import farmerReducer from "./Slices/FarmerSlice";

const store = configureStore({
  reducer: {
    farmer: farmerReducer,
  },
});

export default store;
