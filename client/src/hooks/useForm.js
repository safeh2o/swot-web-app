import { useReducer } from "react";

function reducer(prevState, updates) {
	return {
		...prevState,
		...updates,
	};
}

export default (initialValues) => {
	const [state, dispatch] = useReducer(reducer, initialValues);

	function update(updates) {
		dispatch(updates);
	}

	function reset() {
		dispatch(initialValues);
	}

	return { state, update, reset };
};
