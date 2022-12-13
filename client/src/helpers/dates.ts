import { DateTime } from "luxon";

export function formatDate(value: string) {
	if (!value) {
		return String.fromCharCode(8734);
	}
	return DateTime.fromISO(value).toLocaleString();
}

export function addHours(date: Date, numHours: number) {
	return new Date(date.valueOf() + 60 * 60 * 1000 * numHours);
}
