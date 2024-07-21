import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configVariables from "../configurations/config";
import Cookies from "js-cookie";

const initialState = {
    isLoading: false,
    bagData: null,
    isError: false,
};

export const loadBagData = createAsyncThunk("loadBagData", async (_, thunkAPI) => {
    const jwtToken = Cookies.get("jwtToken");
    const userId = Cookies.get("userId");

    if (!jwtToken || !userId) {
        return thunkAPI.rejectWithValue("JWT token or userId not found in cookies");
    }

    try {
        const response = await axios.get(
            `${configVariables.ipAddress}/bags/getBagData/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


const bagSlice = createSlice({
    name: "bag",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loadBagData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(loadBagData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bagData = action.payload;
        });
        builder.addCase(loadBagData.rejected, (state, action) => {
            console.log(action, "Error");
            state.isError = true;
            state.bagData = null
        });
    },
});

export default bagSlice.reducer;
