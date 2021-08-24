
import {normalize} from "path"
import {ImportMap, PackageInfo} from "../types.js"

export function generateForNodeModules({root, infos}: {
		root: string
		infos: PackageInfo[]
	}) {
	const importmap: ImportMap = {
		imports: {},
		scopes: {},
	}
	function getPath(segments: string[]) {
		return normalize(root + "/node_modules/" + segments.join("/node_modules/"))
	}
	for (const {entry, parents, label} of infos) {
		const isScoped = parents.length > 0
		if (isScoped) {
			const directory = getPath(parents) + "/"
			const scope = importmap.scopes[directory] ?? {}
			scope[label + "/"] = getPath([...parents, label]) + "/"
			if (entry)
				scope[label] = normalize(getPath([...parents, label]) + "/" + entry)
			importmap.scopes[directory] = scope
		}
		else {
			importmap.imports[label + "/"] = getPath([...parents, label]) + "/"
			if (entry)
				importmap.imports[label] = normalize(getPath([...parents, label]) + "/" + entry)
		}
	}

	return importmap
}
