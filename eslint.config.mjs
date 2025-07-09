import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import love from "eslint-config-love";

export default defineConfig([
	js.configs.recommended,
	typescriptEslint.configs.eslintRecommended,
	typescriptEslint.configs.recommendedTypeChecked,
	typescriptEslint.configs.strict,
	love,
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		rules: {
			"import/prefer-default-export": "off",
			"import/no-default-export": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],

			// 0 is used for checking if an array is empty; this will unfortunately allow magic 0's in some contexts
			// but we preferred to override the rule here as opposed to writing `isEmptyArray` with disabled linting
			"@typescript-eslint/no-magic-numbers": [
				"error",
				{ ignore: [0], ignoreEnums: true },
			],
		},
	},
	{
		files: ["**/*.test.ts"],

		plugins: {
			jest,
		},

		rules: {
			"@typescript-eslint/unbound-method": "off",
			"jest/unbound-method": "error",
			"jest/no-focused-tests": "error",
			"max-lines": "off",
			"max-nested-callbacks": "off",
			"@typescript-eslint/no-magic-numbers": "off",
		},
	},
]);
