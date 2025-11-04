import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentTab: "marketPrices",
}

const farmerSlice = createSlice({
    name: "farmer",
    initialState,
    reducers: {
        setCurrentTab(state, action) {
            state.currentTab = action.payload;
        },
    },
});

export const { setCurrentTab } = farmerSlice.actions;
export default farmerSlice.reducer;
