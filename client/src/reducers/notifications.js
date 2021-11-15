import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
	messages: [],
	loading: false,
};

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addMessage: (state, { payload: { type, content } }) => {
			state.messages.unshift({ type, content });
		},
		addNotice: (state, { payload }) => {
			state.messages.unshift({ type: "notice", content: payload });
		},
		addError: (state, { payload }) => {
			state.messages.unshift({ type: "error", content: payload });
		},
		handleServerMessages: (state, { payload: { notices, errors } }) => {
			_.forEach(notices, (notice) => {
				state.messages.unshift({ type: "notice", content: notice });
			});
			_.forEach(errors, (error) => {
				state.messages.unshift({ type: "error", content: error });
			});
		},
		clearNotifications: () => initialState,
		markAllRead: (state) => {
			state.messages.forEach((message) => {
				message.read = true;
			});
		},
		setLoading: (state, { payload }) => {
			state.loading = payload;
		},
	},
});

export const notificationsSelectors = {
	notifications: (state) => state.notifications.messages,
	loading: (state) => state.notifications.loading,
};

export const {
	addError,
	addMessage,
	addNotice,
	markAllRead,
	clearNotifications,
	handleServerMessages,
	setLoading,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
