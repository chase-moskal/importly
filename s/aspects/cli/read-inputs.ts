
import meow from "meow"
import {readStdin} from "../utilities/read-stdin.js"

export function readInputs() {
	const stdin = readStdin()

	const {flags} = meow({
		importMeta: import.meta,
		flags: {
			production: {
				type: "boolean",
				alias: "p",
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

	return {flags, stdin}
}
