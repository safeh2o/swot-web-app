import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { FAQ } from "../types";

export const getFAQs = createAsyncThunk("faq/getFAQs", async () => {
	const res: Promise<FAQ[]> = await fetch("/api/cms/faqs").then((res) => res.json());
	return res;
});

type FAQState = {
	FAQs: FAQ[];
	isLoading: boolean;
};
const initialState: FAQState = {
	FAQs: [],
	isLoading: false,
};

export const faqSlice = createSlice({
	name: "faq",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getFAQs.fulfilled, (state, { payload }) => {
			state.FAQs = payload;
			state.isLoading = false;
		});
		builder.addCase(getFAQs.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getFAQs.rejected, (state) => {
			state.isLoading = false;
		});
	},
	reducers: {},
});

export const faqSelectors = {
	FAQs: (state: RootState) => state.faq.FAQs,
	isLoading: (state: RootState) => state.faq.isLoading,
};

export default faqSlice.reducer;
