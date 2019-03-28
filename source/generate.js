
import * as fs from "./smartfs"
import {errorPrefix} from "./error-prefix"
import {parseConfig} from "./parse-config"
import {prepQueryPackage} from "./prep-query-package"

const err = errorPrefix(`importly generate error: `)

export async function generate({host, configPath}) {
	try {
		const queryPackage = prepQueryPackage({defaultHost: host})
		const rawConfig = await fs.readFile(configPath, {encoding: "utf8"})
		const config = parseConfig(rawConfig)
		const pending = config.map(queryPackage)
		const metaImports = await Promise.all(pending)
		const importmap = {imports: combineImports(metaImports)}
		const json = JSON.stringify(importmap, null, "\t")
		process.stdout.write(`\n${json}\n`)
	}
	catch(error) {
		throw err(error, `config error with "${configPath}": `)
	}
}

function combineImports(metaImports) {
	return metaImports.reduce((last, current) => ({...last, ...current}), {})
}