
import {PackageJson, PackageOrder} from "../../types.js"

export function readPackageJson({dev, json}: {
		dev: boolean
		json: PackageJson
	}): PackageOrder[] {

	const dependencies = {
		...(json.dependencies ?? {}),
		...(dev ? json.devDependencies ?? {} : {}),
	}

	return Object.entries(dependencies)
		.map(([label, version]) => ({
			label,
			version,
			parents: [],
		}))
}
