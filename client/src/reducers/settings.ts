import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

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
	lastSeenCommitSha: (state: RootState) => state.settings.lastSeenCommitSha,
};

export const { clearSettings, setLastSeenCommitSha } = settingsSlice.actions;

export default settingsSlice.reducer;
