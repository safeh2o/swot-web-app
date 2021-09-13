import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSettings = createAsyncThunk(
	"settings/getSettings",
	async () => {
		const res = await fetch("/api/common/settings").then((res) =>
			res.json()
		);
		return res;
	}
);

export const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		settings: {},
		status: null,
	},
	extraReducers: {
		[getSettings.fulfilled]: (state, { payload: settings }) => {
			state.settings = settings;
			state.status = "success";
		},
		[getSettings.pending]: (state) => {
			state.status = "loading";
		},
		[getSettings.rejected]: (state) => {
			state.status = "failed";
		},
	},
});

export const settingsSelectors = {
	settings: (state) => state.settings.settings,
};

export default settingsSlice.reducer;
