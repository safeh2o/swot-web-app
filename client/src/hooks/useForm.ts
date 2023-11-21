import _ from "lodash";
import { useCallback, useReducer } from "react";

export default function useForm<FormStateType>(initialValues: FormStateType) {
	type FieldName = keyof FormStateType;
	type UpdateType = Partial<FormStateType>;
	function reducer(prevState: FormStateType, updates: Partial<FormStateType>) {
		return {
			...prevState,
			...updates,
		};
	}
	const [state, dispatch] = useReducer(reducer, initialValues);

	const update = useCallback(
		(updates: UpdateType) => {
			if (!_.isEqual(state, updates)) {
				dispatch(updates);
			}
		},
		[state]
	);

	const reset = () => {
		update(initialValues);
	};

	function getTextChangeHandler(fieldName: FieldName) {
		return (e: { target: { value: unknown } }) => {
			update({ [fieldName]: e.target.value } as UpdateType);
		};
	}

	return { state, update, reset, getTextChangeHandler };
}
