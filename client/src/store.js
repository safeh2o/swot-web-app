import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import notificationsReducer from "./reducers/notifications";
import { reducer as formReducer } from "redux-form";

export default configureStore({
	reducer: {
		user: userReducer,
		notifications: notificationsReducer,
		form: formReducer,
	},
});
