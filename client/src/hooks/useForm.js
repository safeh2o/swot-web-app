import { useCallback, useReducer } from "react";

function reducer(prevState, updates) {
	return {
		...prevState,
		...updates,
	};
}

const useForm = (initialValues) => {
	const [state, dispatch] = useReducer(reducer, initialValues);

	const update = useCallback(
		(updates) => {
			let updateRequired = false;
			for (const key in updates) {
				if (updates[key] !== state[key]) {
					updateRequired = true;
				}
			}
			if (updateRequired) {
				dispatch(updates);
			}
		},
		[state]
	);

	const reset = () => {
		update(initialValues);
	};

	function getTextChangeHandler(fieldName) {
		return (e) => {
			update({ [fieldName]: e.target.value });
		};
	}

	return { state, update, reset, getTextChangeHandler };
};

export default useForm;
