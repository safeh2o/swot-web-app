import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

type NotificationsState = {
	messages: Message[];
	loading: boolean;
};

type MessageType = "notice" | "error";

type Message = {
	type: MessageType;
	content: string;
	timestamp: string;
	read: boolean;
};

const initialState: NotificationsState = {
	messages: [],
	loading: false,
};

const addMessage = (
	state: NotificationsState,
	type: MessageType,
	content: string
) => {
	const newMessage = {
		type,
		content,
		timestamp: new Date().toISOString(),
		read: false,
	};
	state.messages.unshift(newMessage);
};

const addErrorToState = (state: NotificationsState, content: string) => {
	addMessage(state, "error", content);
};

const addNoticeToState = (state: NotificationsState, content: string) => {
	addMessage(state, "notice", content);
};

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addNotice: (state, { payload }) => {
			if (typeof payload === "string") {
				addNoticeToState(state, payload);
			}
		},
		addError: (state, { payload }) => {
			if (typeof payload === "string") {
				addErrorToState(state, payload);
			}
		},
		handleServerMessages: (state, { payload }) => {
			const notices = payload?.notices || [];
			const errors = payload?.errors || [];
			_.forEach(notices, (notice) => {
				addNoticeToState(state, notice.toString());
			});
			_.forEach(errors, (error) => {
				addErrorToState(state, error.toString());
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
	notifications: (state: RootState) => state.notifications.messages,
	unreadNotifications: (state: RootState) =>
		_.filter(state.notifications.messages, (n) => n.read !== true),
	loading: (state: RootState) => state.notifications.loading,
};

export const {
	addError,
	addNotice,
	markAllRead,
	clearNotifications,
	handleServerMessages,
	setLoading,
	shiftNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
