import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import restaurantReducer from "./restaurantSlice";

const store = configureStore({
    reducer: {
        uiTheme: themeReducer,
        user: userReducer,
        restaurant: restaurantReducer
    }
})

export default store