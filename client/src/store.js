import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import blogReducer from "./reducers/posts";
import notificationsReducer from "./reducers/notifications";
import settingsReducer from "./reducers/settings";
import viewReducer from "./reducers/view";
import { reducer as formReducer } from "redux-form";
import { combineReducers, createStore } from "redux";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
	user: userReducer,
	blog: blogReducer,
	notifications: notificationsReducer,
	settings: settingsReducer,
	form: formReducer,
	view: viewReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(store);
