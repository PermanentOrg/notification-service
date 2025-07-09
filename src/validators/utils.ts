import type { ValidationError } from "joi";

const isValidationError = (item: unknown): item is ValidationError =>
	item instanceof Error && "isJoi" in item && item.isJoi === true;

export { isValidationError };
