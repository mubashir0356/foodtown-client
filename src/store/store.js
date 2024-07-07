import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        uiTheme: themeReducer,
        user: userReducer
    }
})

export default store