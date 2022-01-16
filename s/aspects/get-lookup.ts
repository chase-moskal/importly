
import {ImportlyLookupError} from "./errors.js"
import {linkerUnpkg} from "./linkers/linker-unpkg.js"
import {linkerJsdelivr} from "./linkers/linker-jsdelivr.js"
import {prepareCloudLookup} from "./lookups/prepare-cloud-lookup.js"
import {lookupViaNodeModules} from "./lookups/lookup-via-node-modules.js"

export function getLookup(look: string) {
	const lookups = {
		node_modules: lookupViaNodeModules,
		unpkg: prepareCloudLookup(linkerUnpkg),
		jsdelivr: prepareCloudLookup(linkerJsdelivr),
	}

	const keys = Object.keys(lookups)
	if (!keys.includes(look))
		throw new ImportlyLookupError(`lookup routine "${look}" not found (must be ${keys.map(k => `"${k}"`).join(", ")})`)

	return lookups[look]
}
