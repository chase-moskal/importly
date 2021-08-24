
import {PackageJson, PackageManifest} from "../../types.js"

export function readPackageJson({production, json}: {
		production: boolean
		json: PackageJson
	}): PackageManifest[] {

	const dependencies = {
		...(json.dependencies ?? {}),
		...(production ? {} : (json.devDependencies ?? {})),
	}

	return Object.entries(dependencies)
		.map(([label, version]) => ({
			label,
			version,
			parents: [],
		}))
}
