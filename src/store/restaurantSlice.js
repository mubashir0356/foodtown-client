import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurantData: null
}

const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {
        loadRestaurantData: (state, action) => {
            state.restaurantData = action.payload
        }
    }
})

export default restaurantSlice.reducer

export const { loadRestaurantData } = restaurantSlice.actions