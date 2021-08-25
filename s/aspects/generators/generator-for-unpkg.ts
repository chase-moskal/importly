
import {ImportMap, ImportMapGenerator, PackageManifest} from "../../types.js"
import {ImportlyGenerationError} from "../errors.js"

export const generatorForUnpkg: ImportMapGenerator = ({manifests, semver}) => {
	const importmap: ImportMap = {
		imports: {},
		scopes: {},
	}

	const mostRooty: {[label: string]: PackageManifest} = {}
	for (const manifest of manifests) {
		const already = mostRooty[manifest.label]
		mostRooty[manifest.label] =
			!already || manifest.parents.length < already.parents.length
				? manifest
				: already
	}

	for (const {label, version, entry} of Object.values(mostRooty)) {
		const link = unpkgLink(label, applySemverPreference(semver, version))
		importmap.imports[label + "/"] = link + "/"
		if (entry)
			importmap.imports[label] = connectEntryToLink(link, entry)
	}

	return importmap
}

function applySemverPreference(semver: string, version: string) {
	if (semver === "^") semver = "caret"
	if (semver === "~") semver = "tilde"
	if (semver === "") semver = "lock"

	if (version.startsWith("^") || version.startsWith("~"))
		version = version.slice(1)

	switch (semver) {
		case "caret": return "^" + version
		case "tilde": return "~" + version
		case "lock": return version
		default: throw new ImportlyGenerationError(`invalid semver option "${semver}" (must be "caret", "tilde", or "lock")`)
	}
}

function unpkgLink(label: string, version: string) {
	return `https://unpkg.com/${label}@${version}`
}

function connectEntryToLink(link: string, entry: string) {
	if (entry.startsWith("./"))
		entry = entry.slice(2)
	return link + "/" + entry
}
