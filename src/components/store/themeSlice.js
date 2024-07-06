import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    theme: "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export default themeSlice.reducer

export const { toggleTheme } = themeSlice.actions