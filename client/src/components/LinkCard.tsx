import { Link, SvgIcon } from "@mui/material";
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkCardProps {
	href?: string;
	title: string;
	children?: ReactElement;
	csr?: boolean;
}

export default function LinkCard({
	title = "",
	csr = true,
	href = "#",
	children,
}: LinkCardProps) {
	return (
		<Link
			component={csr ? RouterLink : Link}
			to={csr ? href : undefined}
			href={csr ? undefined : href}
			underline="none"
			color="inherit"
		>
			<div className="card rte">
				<h2 className="title">{title}</h2>
				{children && <div className="text">{children}</div>}
			</div>
		</Link>
	);
}
