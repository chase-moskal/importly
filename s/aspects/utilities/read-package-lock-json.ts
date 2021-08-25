
import {LockDetails, PackageLock, PackageOrder} from "../../types.js"

export function readPackageLockJson({json, production}: {
		json: PackageLock
		production: boolean
	}): PackageOrder[] {

	type Filter = ([]: [string, LockDetails]) => boolean
	
	const filterForActualDependencies: Filter = (
		([directory]) => !!directory
	)

	const filterOutOptionals: Filter = (
		([,{optional}]) => !optional
	)

	const filterDevDependencies: Filter = (
		production
			? ([,details]) => !details.dev
			: () => true
	)

	return Object.entries(json.packages)
		.filter(filterForActualDependencies)
		.filter(filterOutOptionals)
		.filter(filterDevDependencies)
		.map(([directory, {version}]) => {
			const parents = directory
				.split(/\/?node_modules\/?/)
				.filter(s => s.length > 0)
			const label = parents.pop()
			return {
				label,
				version,
				parents,
			}
		})
}
