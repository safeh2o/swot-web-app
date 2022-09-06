import { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async () => {
	const res: { user: any } = await fetch("/api/user/me").then((res) =>
		res.json()
	);
	return res;
});

type UserState = {
	user: { fieldsites: any[]; areas: any[]; countries: any[] };
	isLoggedIn: boolean;
	status: "success" | "loading" | "failed" | null;
};

const initialState: UserState = {
	user: { fieldsites: [], areas: [], countries: [] },
	isLoggedIn: false,
	status: null,
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
};

export default userSlice.reducer;
