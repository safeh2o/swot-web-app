import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("blog/getPosts", async () => {
	const res = await fetch("/api/cms/posts").then((res) => res.json());
	return res;
});

export const blogSlice = createSlice({
	name: "blog",
	initialState: {
		posts: [],
		status: null,
	},
	extraReducers: {
		[getPosts.fulfilled]: (state, { payload }) => {
			state.posts = payload;
			state.status = "success";
		},
		[getPosts.pending]: (state) => {
			state.status = "loading";
		},
		[getPosts.rejected]: (state) => {
			state.status = "failed";
		},
	},
});

export const blogSelectors = {
	posts: (state) => state.blog.posts,
	loadingStatus: (state) => state.blog.status,
};

export default blogSlice.reducer;
