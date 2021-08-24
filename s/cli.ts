
import {parse} from "./aspects/parse.js"
import {readInputs} from "./aspects/cli/read-inputs.js"
import {writeOutput} from "./aspects/cli/write-output.js"
import {nodeLookup} from "./aspects/lookups/node-lookup.js"
import {nodeGenerator} from "./aspects/generators/node-generator.js"

void async function cli() {
	const {flags, stdin} = readInputs()

	const manifests = parse({...flags, specification: stdin})
	const infos = await nodeLookup({manifests})
	const importmap = nodeGenerator({...flags, infos})

	writeOutput({...flags, importmap})
}()
