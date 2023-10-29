import CardGrid from "../CardGrid";
import LinkCard from "../LinkCard";

export default function ManagePage() {
	return (
		<CardGrid>
			<LinkCard title="Countries" href="/manage/countries">
				Create, remove, or rename countries and manage their associated
				areas
			</LinkCard>
			<LinkCard title="Areas" href="/manage/areas">
				Create, remove, or rename areas and manage their associated
				fieldsites and users
			</LinkCard>
			<LinkCard title="Fieldsites" href="/manage/fieldsites">
				Create, remove, or rename fieldsites
			</LinkCard>
		</CardGrid>
	);
}
