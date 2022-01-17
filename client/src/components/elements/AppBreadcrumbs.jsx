import { useEffect } from "react";
import { Breadcrumbs, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popViewsTo, viewSelectors } from "../../reducers/view";
import { Link } from "react-router-dom";

function AppBreadcrumbs(props) {
	const dispatch = useDispatch();
	const viewStack = useSelector(viewSelectors.viewStack);
	const currentView = useSelector(viewSelectors.currentView);
	useEffect(() => {}, [viewStack]);
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
