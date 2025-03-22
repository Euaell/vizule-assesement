
export type FormState = {
	status: "UNSET" | "SUCCESS" | "ERROR";
	message?: string;
	fieldErrors: Record<string, string[] | undefined>;
	fieldValues?: Record<string, unknown>;
};

export const EMPTY_FORM_STATE: FormState = {
	status: "UNSET",
	message: undefined,
	fieldErrors: {},
	fieldValues: {
		title: "",
		numberOfQuestions: 5,
		difficulty: "easy"
	}
};
