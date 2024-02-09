import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
	UnpopulatedArea,
	UnpopulatedCountry,
	UnpopulatedFieldsite,
	User,
	UserPermissions,
} from "../types";

export const getUser = createAsyncThunk("user/getUser", async () => {
	const res: Promise<{ user: User }> = await fetch("/api/user/me").then((res) => res.json());
	return res;
});

export const getUserPermissions = createAsyncThunk("user/getUserPermissions", async () => {
	const res: Promise<{ permissions: UserPermissions }> = await fetch(
		"/api/user/permissions"
	).then((res) => res.json());
	return res;
});

type UserState = {
	user: {
		isAdmin?: boolean;
		name: { first: string; last: string };
		email?: string;
		fieldsites: UnpopulatedFieldsite[];
		areas: UnpopulatedArea[];
		countries: UnpopulatedCountry[];
	};
	isLoggedIn: boolean;
	status: "success" | "loading" | "failed" | null;
	permissions: UserPermissions;
};

const initialState: UserState = {
	user: {
		isAdmin: false,
		fieldsites: [],
		areas: [],
		countries: [],
		name: { first: "", last: "" },
		email: "",
	},
	isLoggedIn: false,
	status: null,
	permissions: {
		countries: [],
		areas: [],
		fieldsites: [],
		users: [],
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getUser.fulfilled, (state, { payload: { user } }) => {
			state.user = user;
			state.isLoggedIn = Boolean(user);
			state.status = "success";
		});
		builder.addCase(getUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(getUser.rejected, (state) => {
			state.status = "failed";
		});
		builder.addCase(
			getUserPermissions.fulfilled,
			(
				state,
				{ payload: { permissions } }: { payload: { permissions: UserPermissions } }
			) => {
				state.permissions = permissions;
			}
		);
		builder.addCase(getUserPermissions.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(getUserPermissions.rejected, (state) => {
			state.status = "failed";
		});
	},
	reducers: {},
});

export const userSelectors = {
	isLoggedIn: (state: RootState) => state.user.isLoggedIn,
	user: (state: RootState) => state.user.user,
	fieldsites: (state: RootState) => state.user.user.fieldsites,
	areas: (state: RootState) => state.user.user.areas,
	countries: (state: RootState) => state.user.user.countries,
	loadingStatus: (state: RootState) => state.user.status,
	permissions: (state: RootState) => state.user.permissions,
};

export default userSlice.reducer;
