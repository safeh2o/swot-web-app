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
			if (typeof payload === "string") {
				state.messages.unshift({ type: "notice", content: payload });
			}
		},
		addError: (state, { payload }) => {
			if (typeof payload === "string") {
				state.messages.unshift({ type: "error", content: payload });
			}
		},
		handleServerMessages: (state, { payload }) => {
			const notices = payload?.notices || [];
			const errors = payload?.errors || [];
			_.forEach(notices, (notice) => {
				state.messages.unshift({
					type: "notice",
					content: notice.toString(),
				});
			});
			_.forEach(errors, (error) => {
				state.messages.unshift({
					type: "error",
					content: error.toString(),
				});
			});
		},
		clearNotifications: () => initialState,
		markAllRead: (state) => {
			state?.messages?.forEach((message) => {
				message.read = true;
			});
		},
		shiftNotification: (state) => {
			state.messages.shift();
		},
		setLoading: (state, { payload }) => {
			state.loading = payload;
		},
	},
});

export const notificationsSelectors = {
	notifications: (state) => state.notifications.messages,
	unreadNotifications: (state) =>
		_.filter(state.notifications.messages, (n) => n.read !== true),
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
	shiftNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
