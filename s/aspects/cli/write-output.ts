
import {ImportMap} from "../../types.js"

export function writeOutput({mini, importmap}: {
		mini: boolean
		importmap: ImportMap
	}) {
	process.stdout.write(
		mini
			? JSON.stringify(importmap) + "\n"
			: JSON.stringify(importmap, undefined, "\t") + "\n"
	)
}
