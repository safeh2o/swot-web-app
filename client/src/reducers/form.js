export function simpleFormReducer(prevState, { type, payload }) {
	switch (type) {
		case "RESET":
			const newState = {};
			Object.keys(prevState).forEach(
				(key) =>
					(newState[key] = Array.isArray(prevState[key]) ? [] : null)
			);
			return newState;
		case "UPDATE":
			return {
				...prevState,
				...payload,
			};
	}
}
