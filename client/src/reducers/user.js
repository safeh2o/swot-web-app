import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async () => {
	const res = await fetch("/api/user/me").then((res) => res.json());
	return res;
});

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: { fieldsites: [] },
		isLoggedIn: false,
		status: null,
	},
	extraReducers: {
		[getUser.fulfilled]: (state, { payload: { user } }) => {
			state.user = user;
			state.isLoggedIn = user !== null;
			state.status = "success";
		},
		[getUser.pending]: (state) => {
			state.status = "loading";
		},
		[getUser.rejected]: (state) => {
			state.status = "failed";
		},
	},
});

export const userSelectors = {
	isLoggedIn: (state) => state.user.isLoggedIn,
	user: (state) => state.user.user,
	fieldsites: (state) => state.user.user.fieldsites,
};

export default userSlice.reducer;
