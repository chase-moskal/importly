
import {default as request} from "request-promise"

import {urlPreppers} from "./url-preppers.mjs"

export async function queryPackage({
	name,
	version = "latest",
	host = "unpkg"
}) {
	const urlPrepper = urlPreppers[host]
	if (!urlPrepper) throw err(`unknown host '${host}' for package '${name}'`)

	const firstUrl = urlPrepper({name, version})
	const {packageVersion, packageModule} = await queryPackageJson(`${firstUrl}/package.json`)
	const secondUrl = urlPrepper({name, version: packageVersion})

	const imports = {}
	imports[`${name}/`] = `${secondUrl}/`
	if (packageModule) imports[name] = `${secondUrl}/${packageModule}`
	return imports
}

async function queryPackageJson(uri) {
	try {
		const json = await request({
			uri,
			json: true,
			method: "get"
		})
		return {
			packageVersion: json.version,
			packageModule: json.module
		}
	}
	catch(error) {
		throw err(error, `error loading package.json for '${name}' from "${packageJsonUrl}"`)
	}
}
