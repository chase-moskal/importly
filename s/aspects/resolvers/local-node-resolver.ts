

import json5 from "json5"
import {readFile} from "fs/promises"
import {resolve as pathResolve} from "path"

import {Resolver} from "../../types.js"

export const localNodeResolver: Resolver = async({
		label,
		version,
		directory = `node_modules/${label}`,
	}) => {
	try {
		const packageJson = json5.parse(
			await readFile(`${directory}/package.json`, "utf-8")
		)
		return {
			label,
			version,
			directory,
			entry: packageJson.main
				? pathResolve(`${directory}/${packageJson.main}`)
				: undefined,
		}
	}
	catch (error) {
		return undefined
	}
}
