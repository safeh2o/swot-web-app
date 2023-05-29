import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Link } from "@mui/material";

interface LinkCardProps {
	href?: string;
	title: string;
	children?: ReactElement;
	csr?: boolean;
	target?: string;
}

export default function LinkCard({
	title = "",
	csr = true,
	href = "#",
	target = "_self",
	children,
}: LinkCardProps) {
	return (
		<Link
			component={csr ? RouterLink : Link}
			to={csr ? href : undefined}
			href={csr ? undefined : href}
			underline="none"
			color="inherit"
			target={target}
		>
			<div className="card rte">
				<h2 className="title">{title}</h2>
				{children && <div className="text">{children}</div>}
			</div>
		</Link>
	);
}
