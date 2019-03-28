
import request from "request-promise"

import {urlStamps} from "./url-stamps"

export function prepQueryPackage({defaultHost}) {
	return async function queryPackage({
		name,
		version = "latest",
		host = defaultHost
	}) {
		const stamp = urlStamps[host]
		if (!stamp) throw err(`unknown host '${host}' for package '${name}'`)

		const firstUrl = stamp({name, version})
		const {packageVersion, packageModule} = await queryPackageJson(`${firstUrl}/package.json`)
		const secondUrl = stamp({name, version: packageVersion})
	
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
}
