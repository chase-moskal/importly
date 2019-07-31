#!/usr/bin/env node

import {argv} from "yargs"
import getStdin from "get-stdin"

import {importly} from "./importly.js"

import * as resolvers from "./resolvers.js"
import * as generators from "./generators.js"

async function main() {
	try {
		const input = await getStdin()
		const {
			lock,
			verbose,
			resolver: resolverName = "jsdelivr",
			generator: generatorName = "jsdelivr"
		} = argv
		const resolver = resolvers[resolverName]
		const generator = generators[generatorName]
		if (!resolver) throw new Error(`unknown resolver "${resolverName}"`)
		if (!generator) throw new Error(`unknown generator "${generatorName}"`)
		const {importmap} = await importly({
			input,
			lock,
			verbose,
			resolver,
			generator
		})
		const json = JSON.stringify(importmap, null, "\t")
		process.stdout.write(`\n${json}\n\n`)
		process.exit(0)
	}
	catch (error) {
		error.message = `importly: ${error.message}`
		console.error(error.message)
		console.error(error.stack)
		process.exit(-1)
	}
}

main()
