
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

function getStamp({stamps, source}) {
	const stamp = stamps[source]
	if (!stamp) throw new Error(`no stamp for source '${source}'`)
	return stamp
}

export async function resolvePackage({
	name,
	source,
	lock,
	version = "latest",
	stamps = defaultStamps,
}) {
	const firstUrl = getStamp({stamps, source})({name, version})
	const imports = {}

	try {

		// fetch meta information about the package, the version and main module
		const {packageVersion, packageModule} = await queryPackageJson(`${firstUrl}/package.json`)

		// if lock enabled, use a version-locked url instead
		const secondUrl = lock
			? getStamp({stamps, source})({name, version: packageVersion})
			: firstUrl

		// whole-package resolution
		// only use first host
		imports[`${name}/`] = `${secondUrl}/`

		// main-module resolution
		// only use first host
		imports[`${name}`] = `${secondUrl}/${packageModule}`
	}
	catch (error) {
		console.error(`error loading package.json "${name}" from "${source}": ${error.message}`)
	}

	return imports
}
