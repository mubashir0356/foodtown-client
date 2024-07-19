import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configVariables from "../configurations/config";
import Cookies from "js-cookie";

const initialState = {
    isLoading: false,
    bagData: null,
    isError: false
}

const jwtToken = Cookies.get("jwtToken")

export const loadBagData = createAsyncThunk("loadBagData", async () => {
    try {
        const response = await axios.get(`${configVariables.ipAddress}/bags/getBagData/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                withCredentials: true,
            }
        )
        return response.data?.data
    } catch (error) {
        console.log("Bag Slice :: loadBagData :: Error", error)
    }
})

const bagSlice = createSlice({
    name: "bag",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loadBagData.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(loadBagData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bagData = action.payload
        });
        builder.addCase(loadBagData.rejected, (state, action) => {
            console.log(action.payload, "Error")
            state.isError = true
        });
    }
})

export default bagSlice.reducer

// export const { loadBagData } = bagSlice.actions