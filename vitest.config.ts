// TS reference uses a triple slash, this is intentional
// eslint-disable-next-line spaced-comment
/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
	test: {
		include: [
			"**/test/**/*Test.ts"
		]
	}
});
