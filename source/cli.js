#!/usr/bin/env node

import getStdin from "get-stdin"

import {parseConfig} from "./parse-config"
import {prepQueryPackage} from "./prep-query-package"

main()

async function main() {
	try {
		const input = await getStdin()
		const config = parseConfig(input)
		const queryPackage = prepQueryPackage({defaultHost: config.settings.host})
		const pending = config.packages.map(queryPackage)
		const metaImports = await Promise.all(pending)
		const importmap = {imports: combineImports(metaImports)}
		const json = JSON.stringify(importmap, null, "\t")
		process.stdout.write(`\n${json}\n`)
	}
	catch (error) {
		error.message = `importly: ${error.message}`
		console.error(error)
	}
}

function combineImports(metaImports) {
	return metaImports.reduce((last, current) => ({...last, ...current}), {})
}
