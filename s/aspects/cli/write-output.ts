
import {ImportMap} from "../../types.js"

export function writeOutput({minimal, importmap}: {
		minimal: boolean
		importmap: ImportMap
	}) {
	process.stdout.write(
		minimal
			? JSON.stringify(importmap) + "\n"
			: "\n" + JSON.stringify(importmap, undefined, "\t") + "\n"
	)
}
