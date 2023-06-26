import _ from "lodash";
import { useCallback, useReducer } from "react";

export default function useForm<FormStateType>(initialValues: FormStateType) {
	type FieldName = keyof FormStateType;
	type UpdateType = Partial<FormStateType>;
	function reducer(prevState: any, updates: any) {
		return {
			...prevState,
			...updates,
		};
	}
	const [state, dispatch] = useReducer(reducer, initialValues);

	const update = useCallback(
		(updates: UpdateType) => {
			if (!_.isMatch(state, updates)) {
				dispatch(updates);
			}
		},
		[state]
	);

	const reset = () => {
		update(initialValues);
	};

	function getTextChangeHandler(fieldName: FieldName) {
		return (e: { target: { value: any } }) => {
			update({ [fieldName]: e.target.value } as UpdateType);
		};
	}

	return { state, update, reset, getTextChangeHandler };
}
