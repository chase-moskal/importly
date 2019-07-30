#!/usr/bin/env node

import {argv} from "yargs"
import getStdin from "get-stdin"

import {importly} from "./importly.js"

async function main() {
	try {
		const {lock} = argv
		const input = await getStdin()
		const {importmap} = await importly({input, lock})
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
