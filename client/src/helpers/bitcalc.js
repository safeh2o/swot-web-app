export const KILOBYTE = 1000;
export const MEGABYTE = 1000000;
export const GIGABYTE = 1000000000;

export function calculateFileInMb(file) {
	return file.size / MEGABYTE;
}
