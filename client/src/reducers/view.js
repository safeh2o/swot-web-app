import { createSlice } from "@reduxjs/toolkit";
import { IGNORED_PATHS, PATH_MAP } from "../constants/breadcrumbs";

const initialState = {
	viewStack: [],
};

export const viewSlice = createSlice({
	name: "view",
	initialState,
	reducers: {
		replaceCrumbTitle: (state, { payload: { path, title } }) => {
			for (let i = state.viewStack.length - 1; i >= 0; i--) {
				const crumb = state.viewStack[i];
				if (crumb?.path === path) {
					crumb.title = title;
					break;
				}
			}
		},
		popViewsTo: (state, { payload: level }) => {
			state.viewStack = state.viewStack.slice(0, level);
		},
		replaceCrumb: (state, { payload }) => {
			let crumbs = payload;
			if (!Array.isArray(payload)) {
				crumbs = [payload];
			}

			state.viewStack.pop();
			for (const crumb of crumbs) {
				state.viewStack.push(crumb);
			}
		},
		inferBreadcrumbs: (state, { payload: paths }) => {
			const newStack = [];
			if (paths?.length && paths[paths.length - 1] !== "") {
				paths.unshift("");
			}
			for (const path of paths) {
				if (IGNORED_PATHS.has(path)) {
					continue;
				}
				const breadcrumb = PATH_MAP[path];
				newStack.push({ title: breadcrumb || path, path });
			}
			state.viewStack = newStack;
		},
	},
});

export const viewSelectors = {
	viewStack: (state) => state.view.viewStack,
};

export const { inferBreadcrumbs, replaceCrumbTitle, popViewsTo, replaceCrumb } =
	viewSlice.actions;

export default viewSlice.reducer;
