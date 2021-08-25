
import {PackageJson, PackageOrder} from "../../types.js"

export function readPackageJson({production, json}: {
		production: boolean
		json: PackageJson
	}): PackageOrder[] {

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
