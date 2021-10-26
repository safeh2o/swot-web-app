import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import notificationsReducer from "./reducers/notifications";
import settingsReducer from "./reducers/settings";
import viewReducer from "./reducers/view";
import { reducer as formReducer } from "redux-form";

export default configureStore({
	reducer: {
		user: userReducer,
		notifications: notificationsReducer,
		settings: settingsReducer,
		form: formReducer,
		view: viewReducer,
	},
});
