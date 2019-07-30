
import * as JSON5 from "json5"

import {resolvePackage} from "./resolve-package.js"
import {stamps as defaultStamps} from "./stamps.js"

export async function importly({
	input,
	lock = false,
	stamps = defaultStamps
}) {

	// parse the config
	const {importly, dependencies} = JSON5.parse(input)
	const {source} = importly
	
	// resolve each package
	const pending = Object.keys(dependencies).map(name => {
		const version = dependencies[name]
		return resolvePackage({name, version, source, lock, stamps})
	})

	// wait for all of the packages to finish
	const metaImports = await Promise.all(pending)

	// each meta import is its own importmap, so combine all of them
	const imports = metaImports.reduce(
		(last, current) => ({...last, ...current}),
		{}
	)

	// return the generated import map
	return {
		importmap: {imports}
	}
}
