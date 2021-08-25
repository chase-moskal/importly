
import {ImportlyGenerationError} from "./errors.js"
import {generatorForUnpkg} from "./generators/generator-for-unpkg.js"
import {generatorForNodeModules} from "./generators/generator-for-node-modules.js"

export async function getGenerator({host}: {host: string}) {

	const generators = {
		unpkg: generatorForUnpkg,
		node_modules: generatorForNodeModules,
	}

	const keys = Object.keys(generators)

	if (!keys.includes(host))
		throw new ImportlyGenerationError(`no generator found for host "${host}" (can be ${keys.map(k => `"${k}"`).join(", ")})`)

	return generators[host]
}
