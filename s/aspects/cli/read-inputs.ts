
import meow from "meow"
import {readStdin} from "../utilities/read-stdin.js"

export function readInputs() {
	const {flags} = meow(`
		basic usage:
			importly < package-lock.json > importmap.json

		more options and information:
			https://github.com/chase-moskal/importly
			or find the readme in your node_modules
	`, {
		importMeta: import.meta,
		flags: {
			dev: {
				type: "boolean",
				shortFlag: "d",
			},
			mini: {
				type: "boolean",
				shortFlag: "m",
			},
			host: {
				type: "string",
				shortFlag: "h",
				default: "node_modules",
			},
			lookup: {
				type: "string",
				shortFlag: "l",
				default: "node_modules",
			},
			root: {
				type: "string",
				shortFlag: "r",
				default: "/",
			},
			semver: {
				type: "string",
				shortFlag: "s",
				default: "exact",
			},
		}
	})

	const stdin = readStdin()

	return {flags, stdin}
}
