
import {ImportlyGenerationError} from "./errors.js"
import {linkerJspm} from "./linkers/linker-jspm.js"
import {linkerUnpkg} from "./linkers/linker-unpkg.js"
import {linkerJsdelivr} from "./linkers/linker-jsdelivr.js"
import {prepareCloudGenerator} from "./generators/prepare-cloud-generator.js"
import {generatorForNodeModules} from "./generators/generator-for-node-modules.js"

export function getGenerator(host: string) {
	const generators = {
		node_modules: generatorForNodeModules,
		jspm: prepareCloudGenerator(linkerJspm),
		unpkg: prepareCloudGenerator(linkerUnpkg),
		jsdelivr: prepareCloudGenerator(linkerJsdelivr),
	}

	const keys = Object.keys(generators)
	if (!keys.includes(host))
		throw new ImportlyGenerationError(`no generator found for host "${host}" (must be ${keys.map(k => `"${k}"`).join(", ")})`)

	return generators[host]
}
