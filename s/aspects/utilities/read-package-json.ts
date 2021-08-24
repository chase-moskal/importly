
import {PackageJson, PackageManifest} from "../../types.js"

export function readPackageJson({dev, json}: {
		dev: boolean
		json: PackageJson
	}): PackageManifest[] {

	const dependencies = {
		...(json.dependencies ?? {}),
		...(dev ? (json.devDependencies ?? {}) : {}),
	}

	return Object.entries(dependencies)
		.map(([label, version]) => ({
			label,
			version,
			localDirectory: undefined,
		}))
}
