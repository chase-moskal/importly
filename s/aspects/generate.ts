
import {ImportMap, PackageSolution} from "../types.js"
import {isScopedDependency} from "./utilities/is-scoped-dependency.js"

export function generate(solutions: PackageSolution[]) {
	const importmap: ImportMap = {
		imports: {},
		scopes: {},
	}
	const prefix = "/"
	for (const solution of solutions) {
		const scoped = isScopedDependency(solution)
		const {label, directory, entry} = solution
		if (scoped) {
			const mapping = importmap.scopes[prefix + scoped.directory + "/"] ?? {}
			mapping[label + "/"] = prefix + directory + "/"
			if (entry)
				mapping[label] = prefix + entry
			importmap.scopes[prefix + scoped.directory + "/"] = mapping
		}
		else {
			importmap.imports[label + "/"] = prefix + directory + "/"
			if (entry)
				importmap.imports[label] = prefix + entry
		}
	}
	return importmap
}
