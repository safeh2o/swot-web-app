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
			state.isLoading = false;
		},
		[getPosts.pending]: (state) => {
			state.isLoading = true;
		},
		[getPosts.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const blogSelectors = {
	posts: (state) => state.blog.posts,
	isLoading: (state) => state.blog.isLoading,
};

export default blogSlice.reducer;
