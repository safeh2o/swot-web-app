export type ConfidenceLevelType = "minDecay" | "maxDecay" | "optimumDecay";

export type Country = {
	_id: string;
	name: string;
	areas: string[];
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
