
import * as JSON5 from "json5"

import {jsdelivr as defaultResolver} from "./resolvers.js"
import {jsdelivr as defaultGenerator} from "./generators.js"

export async function importly({
	input,
	lock = true,
	verbose = false,
	resolver = defaultResolver,
	generator = defaultGenerator
}) {

	//
	// CONFIG
	//

	const {dependencies} = JSON5.parse(input)

	const log = verbose
		? (...all) => console.log(...all)
		: () => {}

	//
	// QUERY PACKAGE
	//

	const packages = await Promise.all(Object.keys(dependencies).map(
		async name => {
			const version = dependencies[name]

			log(`resolving ${name}@${version}..`)
			const pack = await resolver({name, version})

			log(`package info for ${name}:`, pack)
			return pack
		}
	))

	//
	// GENERATION
	//

	log(`generating import map"`)

	let imports = {}
	for (const pack of packages)
		imports = {...imports, ...await generator({...pack, lock})}

	return {importmap: {imports}}
}
