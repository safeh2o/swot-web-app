import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { BlogPost, BlogPostCategories } from "../types";

export const getPosts = createAsyncThunk("blog/getPosts", async () => {
	const res: Promise<BlogPost[]> = await fetch("/api/cms/posts").then((res) => res.json());
	return res;
});

export const getPostCategories = createAsyncThunk("blog/getPostCategories", async () => {
	const res: Promise<BlogPostCategories> = await fetch("/api/cms/post-categories").then((res) =>
		res.json()
	);
	return res;
});

type BlogState = {
	posts: BlogPost[];
	postCategories: BlogPostCategories;
	isLoading: boolean;
};

const initialState: BlogState = {
	posts: [],
	postCategories: { byName: {}, byId: {} },
	isLoading: false,
};

export const blogSlice = createSlice({
	name: "blog",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getPosts.fulfilled, (state, { payload }: { payload: BlogPost[] }) => {
			state.posts = payload;
			state.isLoading = false;
		});
		builder.addCase(getPosts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getPosts.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(getPostCategories.fulfilled, (state, { payload }) => {
			state.postCategories = payload;
			state.isLoading = false;
		});
		builder.addCase(getPostCategories.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getPostCategories.rejected, (state) => {
			state.isLoading = false;
		});
	},
	reducers: {},
});
export const blogSelectors = {
	posts: (state: RootState) => state.blog.posts,
	postCategories: (state: RootState) => state.blog.postCategories,
	isLoading: (state: RootState) => state.blog.isLoading,
};

export default blogSlice.reducer;
