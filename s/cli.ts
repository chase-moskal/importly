#!/usr/bin/env node

import {parse} from "./aspects/parse.js"
import {getLookup} from "./aspects/get-lookup.js"
import {getGenerator} from "./aspects/get-generator.js"
import {readInputs} from "./aspects/cli/read-inputs.js"
import {writeOutput} from "./aspects/cli/write-output.js"

void async function cli() {
	const {flags, stdin} = readInputs()
	const lookup = getLookup(flags.lookup)
	const generator = getGenerator(flags.host)

	const orders = parse({...flags, input: stdin})
	const manifests = await lookup({orders})
	const importmap = generator({...flags, manifests})

	writeOutput({...flags, importmap})
}()
