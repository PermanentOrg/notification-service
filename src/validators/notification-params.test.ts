import {
	forbiddenKeys,
	validateCreateNotificationParams as validate,
} from "./notification-params";
import { isValidationError } from "./utils";

/* eslint-disable @typescript-eslint/no-base-to-string --
 * `Error` does have a valid toString method
 * https://github.com/microsoft/TypeScript/issues/38347
 */

expect.extend({
	toGenerateErrorMessage: (
		func: (data: unknown) => boolean,
		arg: unknown,
		message: string,
	) => {
		try {
			func(arg);
		} catch (error) {
			if (isValidationError(error)) {
				const hasMatchingErrorMessage = error.details
					.map((item) => item.message)
					.includes(message);
				const errorString = error.toString();
				const errorAnnotations = error.annotate();
				if (hasMatchingErrorMessage) {
					return {
						pass: true,
						message: (): string =>
							[
								`expected {${errorString}} not to have error message ${message}:`,
								errorAnnotations,
							].join("\n"),
					};
				}
				return {
					pass: false,
					message: (): string =>
						[
							`expected {${errorString}} to have error message ${message}:`,
							errorAnnotations,
						].join("\n"),
				};
			}
			throw error;
		}
		return {
			pass: false,
			message: (): string => "expected validation result to have an error",
		};
	},
});

describe("Notification parameter validator", () => {
	it("should accept a valid notification (without context)", () => {
		expect(
			validate({
				notificationType: "test",
				toUserId: 1,
			}),
		).not.toHaveProperty("error");
	});

	it("should require an object", () => {
		expect(validate).toGenerateErrorMessage(
			42,
			'"value" must be of type object',
		);
	});

	it("should require the notification type", () => {
		expect(validate).toGenerateErrorMessage(
			{ toUserId: 1 },
			'"notificationType" is required',
		);
	});

	it("should require the to user ID", () => {
		expect(validate).toGenerateErrorMessage(
			{
				notificationType: "test",
			},
			'"toUserId" is required',
		);
	});

	it("should reject other keys", () => {
		expect(validate).toGenerateErrorMessage(
			{
				notificationType: "test",
				toUserId: 1,
				unexpected: true,
			},
			'"unexpected" is not allowed',
		);
	});

	describe("context", () => {
		it("should accept an empty object", () => {
			expect(
				validate({
					notificationType: "test",
					toUserId: 1,
					context: {},
				}),
			).not.toHaveProperty("error");
		});

		it("should accept a non-empty object", () => {
			expect(
				validate({
					notificationType: "test",
					toUserId: 1,
					context: {
						example: "value",
						test: "test",
					},
				}),
			).not.toHaveProperty("error");
		});

		it("should require string values", () => {
			expect(validate).toGenerateErrorMessage(
				{
					notificationType: "test",
					toUserId: 1,
					context: {
						forbidden: true,
					},
				},
				'"context.forbidden" must be a string',
			);
		});

		forbiddenKeys.forEach((forbiddenKey) => {
			it(`should forbid key "${forbiddenKey}"`, () => {
				expect(validate).toGenerateErrorMessage(
					{
						notificationType: "test",
						toUserId: 1,
						context: {
							[forbiddenKey]: "forbidden",
						},
					},
					`"context.${forbiddenKey}" is not allowed`,
				);
			});

			it(`should allow value "${forbiddenKey}"`, () => {
				expect(
					validate({
						notificationType: "test",
						toUserId: 1,
						context: {
							test: forbiddenKey,
						},
					}),
				).not.toHaveProperty("error");
			});
		});

		["google", "google-test", "googleTest"].forEach((forbiddenKey) => {
			it(`should forbid key starting with "google" ("${forbiddenKey}")`, () => {
				expect(validate).toGenerateErrorMessage(
					{
						notificationType: "test",
						toUserId: 1,
						context: {
							[forbiddenKey]: "forbidden",
						},
					},
					`"context.${forbiddenKey}" is not allowed`,
				);
			});
		});

		["gcm", "gcm-test", "gcmTest"].forEach((forbiddenKey) => {
			it(`should forbid key starting with "gcm" ("${forbiddenKey}")`, () => {
				expect(validate).toGenerateErrorMessage(
					{
						notificationType: "test",
						toUserId: 1,
						context: {
							[forbiddenKey]: "forbidden",
						},
					},
					`"context.${forbiddenKey}" is not allowed`,
				);
			});
		});

		it('should accept a key containing "google"', () => {
			expect(
				validate({
					notificationType: "test",
					toUserId: 1,
					context: {
						agoogle: "test",
					},
				}),
			).not.toHaveProperty("error");
		});

		it('should accept a key containing "gcm"', () => {
			expect(
				validate({
					notificationType: "test",
					toUserId: 1,
					context: {
						agcm: "test",
					},
				}),
			).not.toHaveProperty("error");
		});

		it('should accept a value starting with "google"', () => {
			expect(
				validate({
					notificationType: "test",
					toUserId: 1,
					context: {
						test: "google",
					},
				}),
			).not.toHaveProperty("error");
		});

		it('should accept a key starting with "gcm"', () => {
			expect(
				validate({
					notificationType: "test",
					toUserId: 1,
					context: {
						test: "gcm",
					},
				}),
			).not.toHaveProperty("error");
		});
	});
});
