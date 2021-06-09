import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	errors: [],
	notices: {},
	errorHeaderText: "An error occurred while submitting this form:",
};

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addError: (state, { payload }) => {
			state.errors.push(payload);
		},
		addNotice: (state, { payload: { label, notice } }) => {
			if (payload) {
				state.notices[label] = notice;
			}
		},
		handleServerMessages: (state, { payload: { notices, errors } }) => {
			state.notices = notices || {};
			state.errors = errors || [];
		},
		clearNotifications: () => initialState,
	},
});

export const notificationsSelectors = {
	notifications: (state) => state.notifications,
};

export const { addError, addNotice, clearNotifications, handleServerMessages } =
	notificationsSlice.actions;

export default notificationsSlice.reducer;
