import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	errors: [],
	notices: {},
	errorHeaderText: "An error occurred while submitting this form:",
	loading: false,
};

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addError: (state, { payload }) => {
			state.errors.push(payload);
		},
		addNotice: (state, { payload: { label, notice } }) => {
			state.notices[label] = notice;
		},
		handleServerMessages: (state, { payload: { notices, errors } }) => {
			state.notices = notices || {};
			state.errors = errors || [];
		},
		clearNotifications: () => initialState,
		setLoading: (state, { payload }) => {
			state.loading = payload;
		},
	},
});

export const notificationsSelectors = {
	notifications: (state) => state.notifications,
	loading: (state) => state.notifications.loading,
};

export const {
	addError,
	addNotice,
	clearNotifications,
	handleServerMessages,
	setLoading,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
