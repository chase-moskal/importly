
import request from "request-promise"

import {stamps as defaultStamps} from "./stamps"

async function queryPackageJson(uri) {
	try {
		const json = await request({
			uri,
			json: true,
			method: "get"
		})
		return {
			packageVersion: json.version,
			packageModule: json.module || json.main
		}
	}
	catch (error) {
		error.message = `error reading package json for "${uri}": ${error.message}`
		throw error
	}
}

function getStamp({stamps, host}) {
	const stamp = stamps[host]
	if (!stamp) throw new Error(`unknown host '${firstHost}' for package '${name}'`)
	return stamp
}

export async function queryPackage({
	name,
	hosts,
	version = "latest",
	stamps = defaultStamps,
}) {
	const firstHost = hosts[0]
	const firstUrl = getStamp({stamps, host: firstHost})({name, version})
	const imports = {}

	try {

		// fetch meta information about the package, the version and main module
		const {packageVersion, packageModule} = await queryPackageJson(`${firstUrl}/package.json`)

		// prepare stamped url's for each host
		const stampedUrls = hosts.map(
			host => getStamp({stamps, host})({name, version: packageVersion})
		)

		// whole-package resolution
		imports[`${name}/`] = stampedUrls.map(url => `${url}/`)

		// main-module resolution
		imports[`${name}`] = stampedUrls.map(url => `${url}/${packageModule}`)
	}
	catch (error) {
		console.error(`error loading package.json "${name}" from "${firstUrl}": ${error.message}`)
	}

	return imports
}
