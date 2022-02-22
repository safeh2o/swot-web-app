import { Box, Breadcrumbs } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { popViewsTo, viewSelectors } from "../../reducers/view";

function AppBreadcrumbs(props) {
	const dispatch = useDispatch();
	const viewStack = useSelector(viewSelectors.viewStack);
	const currentView = useSelector(viewSelectors.currentView);
	useEffect(() => {}, [viewStack]);

	const location = useLocation();
	const path = location.pathname.split(/[/]/);
	console.log(path);

	return (
		<Breadcrumbs {...props}>
			{viewStack.map((view, i) => (
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
				<Box component="span">{currentView.title}</Box>
			</Box>
		</Breadcrumbs>
	);
}

export default AppBreadcrumbs;
