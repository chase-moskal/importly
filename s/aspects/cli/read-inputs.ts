
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
			minimal: {
				type: "boolean",
				alias: "m",
			},
			root: {
				type: "string",
				alias: "r",
				default: "/",
			},
		}
	})

	return {flags, stdin}
}
