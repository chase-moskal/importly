
import {PackageJson} from "../../types.js"

export function determinePackageEntry(json: PackageJson) {
	return json.type === "module"
		? json.main ?? json.module
		: json.module ?? json.main
}
