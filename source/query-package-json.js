
import request from "request-promise"

export async function queryPackageJson(uri) {
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
