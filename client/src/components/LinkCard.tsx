import { Link } from "@mui/material";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface LinkCardProps {
	href?: string;
	title: string;
	children?: ReactNode;
	/** cross-site reference */
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
