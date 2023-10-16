import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "/src/redux/slices/cartSlice";
import authReducer from "/src/redux/slices/authSlice";
import { api } from "/src/redux/api/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
