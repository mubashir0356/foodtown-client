import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configVariables from "../configurations/config";
import Cookies from "js-cookie";

const initialState = {
    isLoading: false,
    bagData: null,
    isError: false,
};

const jwtToken = Cookies.get("jwtToken")
const userId = Cookies.get("userId")

export const loadBagData = createAsyncThunk("loadBagData", async () => {
    console.log(jwtToken, "bag JwtToken");

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
        });
    },
});

export default bagSlice.reducer;
