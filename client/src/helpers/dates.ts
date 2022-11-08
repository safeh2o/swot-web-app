import { DateTime } from "luxon";

export function formatDate(value: string) {
	if (!value) {
		return String.fromCharCode(8734);
	}
	return DateTime.fromISO(value).toLocaleString();
}
