import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

const store = configureStore({
    reducer: { uiTheme: themeReducer }
})

export default store