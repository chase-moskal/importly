
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
				alias: "d",
			},
			mini: {
				type: "boolean",
				alias: "m",
			},
			host: {
				type: "string",
				alias: "h",
				default: "node_modules",
			},
			lookup: {
				type: "string",
				alias: "l",
				default: "node_modules",
			},
			root: {
				type: "string",
				alias: "r",
				default: "/",
			},
			semver: {
				type: "string",
				alias: "s",
				default: "exact",
			},
		}
	})

	const stdin = readStdin()

	return {flags, stdin}
}
