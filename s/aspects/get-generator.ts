
import {ImportlyGenerationError} from "./errors.js"
import {generatorForJspm} from "./generators/generator-for-jspm.js"
import {generatorForUnpkg} from "./generators/generator-for-unpkg.js"
import {generatorForJsdelivr} from "./generators/generator-for-jsdelivr.js"
import {generatorForNodeModules} from "./generators/generator-for-node-modules.js"

export function getGenerator(host: string) {
	const generators = {
		jspm: generatorForJspm,
		unpkg: generatorForUnpkg,
		jsdelivr: generatorForJsdelivr,
		node_modules: generatorForNodeModules,
	}

	const keys = Object.keys(generators)
	if (!keys.includes(host))
		throw new ImportlyGenerationError(`no generator found for host "${host}" (must be ${keys.map(k => `"${k}"`).join(", ")})`)

	return generators[host]
}
