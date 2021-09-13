import { useReducer } from "react";

function reducer(prevState, action) {
	const newState = { ...prevState };
	newState[action.blob].sasToken = action.sasToken;
}

function init({ initialValues, datasetId }) {
	if (!datasetId) {
		return initialValues;
	}

	const state = {};
	for (const blob in initialValues) {
		const path = initialValues[blob].path;

		fetch("/api/auth/sas", {
			method: "POST",
			body: JSON.stringify({
				datasetId,
				blobName: path,
			}),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((json) => {
				state[blob] = {
					path,
					sasToken: json.token,
				};
			});
	}

	return state;
}

const useBlob = (initialValues, datasetId) => {
	const [state, dispatch] = useReducer(
		reducer,
		{ initialValues, datasetId },
		init
	);

	return state;
};

export default useBlob;
