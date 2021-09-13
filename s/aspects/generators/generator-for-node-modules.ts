
import {ImportMap, Generate} from "../../types.js"
import {unixNormalize} from "../utilities/unix-normalize.js"

export const generatorForNodeModules: Generate = ({root, manifests}) => {
	const importmap: ImportMap = {
		imports: {},
		scopes: {},
	}

	function getPath(segments: string[]) {
		return unixNormalize(root + "/node_modules/" + segments.join("/node_modules/"))
	}

	for (const {entry, parents, label} of manifests) {
		const isScoped = parents.length > 0
		if (isScoped) {
			const directory = getPath(parents) + "/"
			const scope = importmap.scopes[directory] ?? {}
			scope[label + "/"] = getPath([...parents, label]) + "/"
			if (entry)
				scope[label] = unixNormalize(getPath([...parents, label]) + "/" + entry)
			importmap.scopes[directory] = scope
		}
		else {
			importmap.imports[label + "/"] = getPath([...parents, label]) + "/"
			if (entry)
				importmap.imports[label] = unixNormalize(getPath([...parents, label]) + "/" + entry)
		}
	}

	return importmap
}
