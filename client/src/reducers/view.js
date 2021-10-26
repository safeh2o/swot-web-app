import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	viewStack: [],
	currentView: { title: "Home", path: "/" },
};

export const viewSlice = createSlice({
	name: "view",
	initialState,
	reducers: {
		pushView: (state, { payload }) => {
			if (state.currentView.path != payload.path) {
				state.viewStack.push(state.currentView);
				state.currentView = payload;
			}
		},
		popViewsTo: (state, { payload: index }) => {
			state.currentView = state.viewStack[index];
			state.viewStack = state.viewStack.slice(0, index);
		},
		clearViewStack: () => initialState,
	},
});

export const viewSelectors = {
	viewStack: (state) => state.view.viewStack,
	currentView: (state) => state.view.currentView,
};

export const { pushView, clearViewStack, popViewsTo } = viewSlice.actions;

export default viewSlice.reducer;
