import { useCallback, useEffect, useState } from "react";

const useHashParams = () => {
	const setHashParams = useCallback((newHashParams: string) => {
		window.location.hash = newHashParams;
	}, []);
	const [hashParams, updateLocalHashParams] = useState(
		new URLSearchParams(window.location.hash.substring(1))
	);

	useEffect(() => {
		const handleHashChange = () => {
			updateLocalHashParams(
				new URLSearchParams(window.location.hash.substring(1))
			);
		};
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	const retVal: [URLSearchParams, (newHashParams: string) => void] = [
		hashParams,
		setHashParams,
	];

	return retVal;
};

export default useHashParams;
