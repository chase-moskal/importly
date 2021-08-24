
import {extractPackageLabel} from "./extract-package-label.js"
import {LockDetails, PackageLock, PackageManifest} from "../../types.js"

export function readPackageLockJson({dev, json}: {
		dev: boolean
		json: PackageLock
	}): PackageManifest[] {

	type Filter = ([]: [string, LockDetails]) => boolean
	
	const filterForActualDependencies: Filter =
		([directory]) => !!directory

	const filterDevDependencies: Filter =
		dev
			? () => true
			: ([,details]) => !details.dev

	return Object.entries(json.packages)
		.filter(filterForActualDependencies)
		.filter(filterDevDependencies)
		.map(([directory, {version}]) => ({
			version,
			directory,
			label: extractPackageLabel(directory),
		}))
}
