import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import restaurantReducer from "./restaurantSlice";
import bagReducer from "./bagSlice";

const store = configureStore({
    reducer: {
        uiTheme: themeReducer,
        user: userReducer,
        restaurant: restaurantReducer,
        bag: bagReducer
    }
})

export default store