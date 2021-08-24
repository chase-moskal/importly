
import {readFile} from "fs/promises"

import {importly} from "./importly.js"
import {localNodeResolver} from "./aspects/resolvers/local-node-resolver.js"

void async function main() {

	const packageLock = await readFile("package-lock.json", "utf-8")

	const importmap = await importly({
		dev: true,
		specification: packageLock,
		resolver: localNodeResolver,
	})

	console.log(importmap)
}()
