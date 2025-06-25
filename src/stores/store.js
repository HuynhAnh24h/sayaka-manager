import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";
import restaurantReducer from "./Restaurant/RestaurantSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
        // Thêm các reducer khác nếu cần
    }
}); 