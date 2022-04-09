import { Box, Breadcrumbs } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
	inferBreadcrumbs,
	popViewsTo,
	viewSelectors,
} from "../../reducers/view";

function AppBreadcrumbs(props) {
	const dispatch = useDispatch();
	const viewStack = useSelector(viewSelectors.viewStack);
	const currentView = viewStack?.[viewStack.length - 1];
	const location = useLocation();
	const paths = location.pathname.split("/").slice(1);
	useEffect(() => {
		dispatch(inferBreadcrumbs(paths));
	}, [location]);

	return (
		<Breadcrumbs {...props}>
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
					maxWidth: "12ch",
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
