
import {parse2} from "./aspects/parse2.js"
import {readInputs} from "./aspects/cli/read-inputs.js"
import {writeOutput} from "./aspects/cli/write-output.js"
import {generateForNodeModules} from "./aspects/generate.js"
import {nodeResolve} from "./aspects/resolvers/node-resolve.js"

void async function cli() {
	const {flags, stdin} = readInputs()

	const manifests = parse2({...flags, specification: stdin})
	const infos = await nodeResolve({manifests})
	const importmap = generateForNodeModules({...flags, infos})

	writeOutput({...flags, importmap})
}()
