import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFAQs = createAsyncThunk("faq/getFAQs", async () => {
	const res = await fetch("/api/cms/faqs").then((res) => res.json());
	return res;
});

export const faqSlice = createSlice({
	name: "faq",
	initialState: {
		FAQs: [],
		status: null,
	},
	extraReducers: {
		[getFAQs.fulfilled]: (state, { payload }) => {
			state.FAQs = payload;
			state.isLoading = false;
		},
		[getFAQs.pending]: (state) => {
			state.isLoading = true;
		},
		[getFAQs.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const faqSelectors = {
	FAQs: (state) => state.faq.FAQs,
	isLoading: (state) => state.faq.isLoading,
};

export default faqSlice.reducer;
