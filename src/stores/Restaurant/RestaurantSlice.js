import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurantId: localStorage.getItem("restaurantId") || null, 
    restaurantName: localStorage.getItem("restaurantName") || null,
}

const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {
        setRestaurantId: (state, action) => {
            state.restaurantId = action.payload;
            localStorage.setItem("restaurantId", action.payload);
        },
        setRestaurantName: (state, action) => {
            state.restaurantName = action.payload;
            localStorage.setItem("restaurantName", action.payload);
        },
    },
});

export const { setRestaurantId, setRestaurantName } = restaurantSlice.actions;

export default restaurantSlice.reducer;
    