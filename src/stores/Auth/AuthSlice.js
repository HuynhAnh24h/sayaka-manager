import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: localStorage.getItem("userId") || null,
    restaurantId: localStorage.getItem("restaurantId") || null,
    restaurantName: localStorage.getItem("restaurantName") || "",
    userFullName: localStorage.getItem("userFullName") || "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { userId, restaurantId, restaurantName, userFullName, position } = action.payload;
            state.userId = userId;
            state.restaurantId = restaurantId;
            state.restaurantName = restaurantName;
            state.userFullName = userFullName;
            state.position = position
            // Lưu vào localStorage để duy trì trạng thái sau khi refresh
            localStorage.setItem("userId", userId);
            localStorage.setItem("restaurantId", restaurantId);
            localStorage.setItem("restaurantName", restaurantName);
            localStorage.setItem("userFullName", userFullName);
            localStorage.setItem("position",position)

        },
        logout: (state) => {
            state.userId = null;
            state.restaurantId = null;
            state.restaurantName = "";
            state.userFullName = "";
            state.position = ""

            // Xóa dữ liệu khỏi localStorage khi đăng xuất
            localStorage.removeItem("userId");
            localStorage.removeItem("restaurantId");
            localStorage.removeItem("restaurantName");
            localStorage.removeItem("userFullName");
            localStorage.removeItem("position");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;