
import {ImportMap, PackageSolution} from "../types.js"
import {isScopedDependency} from "./utilities/is-scoped-dependency.js"

export function generate(solutions: PackageSolution[]) {
	const importmap: ImportMap = {
		imports: {},
		scopes: {},
	}
	for (const solution of solutions) {
		const scoped = isScopedDependency(solution)
		const {label, directory, entry} = solution
		if (scoped) {
			const mapping = importmap.scopes[scoped.directory + "/"] ?? {}
			mapping[label + "/"] = directory + "/"
			if (entry)
				mapping[label] = entry
			importmap.scopes[scoped.directory + "/"] = mapping
		}
		else {
			importmap.imports[label + "/"] = directory + "/"
			if (entry)
				importmap.imports[label] = entry
		}
	}
	return importmap
}
