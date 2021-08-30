
import {ImportlyGenerationError} from "../errors.js"
import {ImportMap, Generate, PackageManifest, Linker} from "../../types.js"

export const prepareCloudGenerator = (
		linker: Linker
	): Generate => ({manifests, semver}) => {

	const mostRooty: {[label: string]: PackageManifest} = {}
	for (const manifest of manifests) {
		const already = mostRooty[manifest.label]
		mostRooty[manifest.label] =
			!already || manifest.parents.length < already.parents.length
				? manifest
				: already
	}

	const importmap: ImportMap = {
		imports: {},
		scopes: {},
	}

	for (const {label, version, entry} of Object.values(mostRooty)) {
		const link = linker(label, applySemverPreference(semver, version))
		importmap.imports[label + "/"] = link + "/"
		if (entry)
			importmap.imports[label] = connectEntryToLink(link, entry)
	}

	return importmap
}

function applySemverPreference(semver: string, version: string) {
	if (semver === "^") semver = "major"
	if (semver === "~") semver = "minor"
	if (semver === "") semver = "exact"

	if (version.startsWith("^") || version.startsWith("~"))
		version = version.slice(1)

	switch (semver) {
		case "major": return "^" + version
		case "minor": return "~" + version
		case "exact": return version
		default: throw new ImportlyGenerationError(`invalid semver option "${semver}" (must be "major", "minor", or "exact")`)
	}
}

function connectEntryToLink(link: string, entry: string) {
	if (entry.startsWith("./"))
		entry = entry.slice(2)
	return link + "/" + entry
}
