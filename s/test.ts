
import {readFile} from "fs/promises"
import {importly} from "./importly.js"

void async function main() {

	const packageLock = await readFile("package-lock.json", "utf-8")

	await importly({
		dev: false,
		packageLock,
	})
}()
