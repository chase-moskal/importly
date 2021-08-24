
import {PackageJson, PackageManifest2} from "../../types.js"

export function readPackageJson2({production, json}: {
		production: boolean
		json: PackageJson
	}): PackageManifest2[] {

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
