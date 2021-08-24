
import {PackageSolution} from "../../types.js"

export function isScopedDependency({directory}: PackageSolution) {
	const parts = directory.split("node_modules/")
	return parts.length > 2
		? {
			directory: parts
				.slice(0, parts.length - 1)
				.join("node_modules/")
				.slice(0, -1)
		}
		: false
}
