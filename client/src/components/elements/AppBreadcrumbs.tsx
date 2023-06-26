import { Box, Breadcrumbs } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
	inferBreadcrumbs,
	popViewsTo,
	viewSelectors,
} from "../../reducers/view";

function AppBreadcrumbs() {
	const dispatch = useDispatch();
	const viewStack = useSelector(viewSelectors.viewStack);
	const currentView = viewStack?.[viewStack.length - 1];
	const location = useLocation();
	const paths = useMemo(
		() => location.pathname.split("/").slice(1),
		[location]
	);

	useEffect(() => {
		dispatch(inferBreadcrumbs(paths));
	}, [dispatch, paths]);

	return (
		<Breadcrumbs className="breadcrumbs small" separator={"→"}>
			{viewStack.slice(0, -1).map((view, i) => (
				<Link
					key={view.path}
					to={view.path}
					onClick={() => {
						dispatch(popViewsTo(i));
					}}
				>
					{view.title}
				</Link>
			))}
			<Box
				component="span"
				sx={{
					display: "block",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					overflow: "hidden",
				}}
			>
				<Box component="span">{currentView?.title}</Box>
			</Box>
		</Breadcrumbs>
	);
}

export default AppBreadcrumbs;
