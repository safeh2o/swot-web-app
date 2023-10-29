import { ReactNode } from "react";
export default function CardGrid({ children }: { children: ReactNode }) {
	return (
		<section className="card-grid">
			<div className="section-wrap compact">
				<div className="cards">{children}</div>
			</div>
		</section>
	);
}
