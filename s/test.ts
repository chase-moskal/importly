
import {readFile} from "fs/promises"
import {importly, localNodeResolver} from "./importly.js"

void async function main() {

	const packageLock = await readFile("package-lock.json", "utf-8")

	const importmap = await importly({
		dev: true,
		specification: packageLock,
		resolver: localNodeResolver,
	})

	console.log(importmap)
}()
