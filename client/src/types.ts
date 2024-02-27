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
	areas: UnpopulatedArea[];
	fieldsites: UnpopulatedFieldsite[];
	countries: UnpopulatedCountry[];
};

export type Dataset = {
	_id: string;
	name: string;
	completionStatus: string;
	lastAnalyzed: string;
	confidenceLevel: ConfidenceLevelType;
	dateCreated: string;
	user: {
		_id: string;
		name: { first: string; last: string };
	};
	maxDuration: number;
	startDate: string;
	endDate: string;
	eo: {
		reco: number;
	};
	ann: {
		average_time: number;
	};
	safety_range: [number, number];
	firstSample: string;
	lastSample: string;
	nSamples: number;
	safe_percent: number;
};
export type BlogPostCategory = {
	_id: string;
	name: string;
	key: string;
};
export type BlogPostCategories = {
	byName: Record<string, BlogPostCategory>;
	byId: Record<string, BlogPostCategory>;
};
export type BlogPost = {
	_id?: string;
	slug?: string;
	title: string;
	content: {
		brief?: string;
		extended: string;
	};
	publishedDate?: string;
	categories?: string[];
	image?: {
		secure_url: string;
	};
};
export type Page = {
	title: string;
	content: {
		brief?: string;
		extended: string;
	};
	image?: {
		secure_url: string;
	};
};

export type FAQ = {
	title: string;
	content: string;
};

export type ChartData = Record<string, string>[];
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

export type UserPermissions = {
	countries: Country[];
	areas: Area[];
	fieldsites: Fieldsite[];
	users: User[];
};

export type ServerMessages = { notices: string[]; errors: string[] };
