import { createSlice } from "@reduxjs/toolkit";

const initialState = { lastSeenCommitSha: "" };

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setLastSeenCommitSha: (state, { payload }) => {
			state.lastSeenCommitSha = payload;
		},
		clearSettings: () => initialState,
	},
});

export const settingsSelectors = {
	lastSeenCommitSha: (state) => state.settings.lastSeenCommitSha,
};

export const { addSetting, clearSettings, setLastSeenCommitSha } =
	settingsSlice.actions;

export default settingsSlice.reducer;
