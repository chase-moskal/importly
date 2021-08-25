
import {parse} from "./aspects/parse.js"
import {lookup} from "./aspects/lookup.js"
import {readInputs} from "./aspects/cli/read-inputs.js"
import {writeOutput} from "./aspects/cli/write-output.js"
import {getGenerator} from "./aspects/get-generator.js"

void async function cli() {
	const {flags, stdin} = readInputs()
	const generator = await getGenerator(flags)

	const orders = parse({...flags, input: stdin})
	const manifests = await lookup({orders})
	const importmap = generator({...flags, manifests})

	writeOutput({...flags, importmap})
}()
