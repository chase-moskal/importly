

import json5 from "json5"
import {normalize} from "path"
import {readFile} from "fs/promises"

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
				? normalize(directory + "/" + packageJson.main)
				: undefined,
		}
	}
	catch (error) {
		return undefined
	}
}
