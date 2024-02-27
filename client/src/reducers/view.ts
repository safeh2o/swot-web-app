import { createSlice } from "@reduxjs/toolkit";

import { IGNORED_PATHS, PATH_MAP } from "../constants/breadcrumbs";
import { RootState } from "../store";

type Path = keyof typeof PATH_MAP;

type Crumb = {
	path: Path;
	title: string;
};

type ViewState = {
	viewStack: Crumb[];
};

const initialState: ViewState = {
	viewStack: [],
};

export const viewSlice = createSlice({
	name: "view",
	initialState,
	reducers: {
		replaceCrumbTitle: (state, { payload: { path, title } }: { payload: Crumb }) => {
			for (let i = state.viewStack.length - 1; i >= 0; i--) {
				const crumb = state.viewStack[i];
				if (crumb.path === path) {
					crumb.title = title;
					break;
				}
			}
		},
		popViewsTo: (state, { payload: level }: { payload: number }) => {
			state.viewStack = state.viewStack.slice(0, level);
		},
		replaceCrumb: (state, { payload }: { payload: Crumb[] | Crumb }) => {
			const crumbs = Array.isArray(payload) ? payload : [payload];

			state.viewStack.pop();
			for (const crumb of crumbs) {
				state.viewStack.push(crumb);
			}
		},
		inferBreadcrumbs: (state, { payload: paths }: { payload: Path[] }) => {
			const newStack = [];
			if (paths?.length && paths[paths.length - 1] !== "") {
				paths.unshift("");
			}
			let currentPath = "";
			for (const path of paths) {
				if (path) {
					currentPath += `/${path}`;
				}
				if (IGNORED_PATHS.has(path)) {
					continue;
				}
				const breadcrumb = PATH_MAP[path];
				newStack.push({ title: breadcrumb || path, path: currentPath });
			}
			state.viewStack = newStack;
		},
	},
});

export const viewSelectors = {
	viewStack: (state: RootState) => state.view.viewStack,
};

export const { inferBreadcrumbs, replaceCrumbTitle, popViewsTo, replaceCrumb } = viewSlice.actions;

export default viewSlice.reducer;
