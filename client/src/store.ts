import { combineReducers } from 'redux';
import {
    FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './reducers/blog';
import faqReducer from './reducers/faq';
import notificationsReducer from './reducers/notifications';
import settingsReducer from './reducers/settings';
import userReducer from './reducers/user';
import viewReducer from './reducers/view';

const rootReducer = combineReducers({
	user: userReducer,
	blog: blogReducer,
	notifications: notificationsReducer,
	view: viewReducer,
	faq: faqReducer,
	settings: settingsReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;

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
