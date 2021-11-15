import { useReducer } from "react";

function reducer(prevState, updates) {
	return {
		...prevState,
		...updates,
	};
}

const useForm = (initialValues) => {
	const [state, dispatch] = useReducer(reducer, initialValues);

	function update(updates) {
		dispatch(updates);
	}

	function reset() {
		dispatch(initialValues);
	}

	function getTextChangeHandler(fieldName) {
		return (e) => {
			update({ [fieldName]: e.target.value });
		};
	}

	return { state, update, reset, getTextChangeHandler };
};

export default useForm;
