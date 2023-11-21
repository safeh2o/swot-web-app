export type ConfidenceLevelType = "minDecay" | "maxDecay" | "optimumDecay";

export type Country = {
	_id: string;
	name: string;
	areas: Area[];
};

export type Area = {
	_id: string;
	name: string;
	fieldsites: Fieldsite[];
	users: User[];
};

export type Fieldsite = {
	_id: string;
	name: string;
};

export type User = {
	_id: string;
	name: { first: string; last: string };
	email: string;
	isAdmin: boolean;
	areas: Area[];
	fieldsites: Fieldsite[];
	countries: Country[];
};

export type Dataset = {
	_id: string;
	name: string;
	completionStatus: string;
	lastAnalyzed?: string;
};
export type BlogPostCategory = {
	_id: string;
	name: string;
	key: string;
};
export type BlogPost = {
	_id: string;
	slug: string;
	title: string;
	content: {
		brief: string;
		extended: string;
	};
	publishedDate: string;
	categories: string[];
};

export type FAQ = {
	title: string;
	content: string;
};

export type ChartData = Array<Record<string, string>>;
export type UnpopulatedArea = {
	_id: string;
	name: string;
	fieldsites: string[];
};
export type UnpopulatedCountry = {
	_id: string;
	name: string;
	areas: string[];
};
export type UnpopulatedFieldsite = {
	_id: string;
	name: string;
};
