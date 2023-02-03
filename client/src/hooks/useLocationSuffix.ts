/*
This hook is used to get the hash params (the part after the # in live.safeh2o.app/analyze#country=xxxxxxxxxx&area=xxxx&fieldsite=xxxxx)
If the user's URL already contains the hash params, it just returns those
If the user is on a page like Result where it doesn't explicitly have it in the URL, it tries to get it from the Breadcrumbs
*/

import { useLocation } from "react-router-dom";
import { PATH_MAP } from "../constants/breadcrumbs";
import { viewSelectors } from "../reducers/view";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function useLocationSuffix() {
	const location = useLocation();
	const path = location.pathname.split("/");
	const basePath = path?.[1];
	const viewStack = useSelector(viewSelectors.viewStack);

	const locationParams = useMemo(() => {
		if (
			basePath !== undefined &&
			PATH_MAP[basePath] === "Results" &&
			path.length > 2
		) {
			// get fieldsite-level hash params
			const fieldsiteCrumb = viewStack
				.slice(-2, -1)[0]
				?.path?.split("#")
				.slice(-1)?.[0];
			return fieldsiteCrumb;
		}

		return location.hash.slice(1);
	}, [basePath, location.hash, path.length, viewStack]);

	return locationParams;
}
