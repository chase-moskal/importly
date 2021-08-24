
import json5 from "json5"
import {readFile} from "fs/promises"
import {ImportlyLookupError} from "../errors.js"
import {PackageInfo, PackageManifest} from "../../types.js"
import {determinePackageEntry} from "../utilities/determine-package-entry.js"

export async function nodeLookup({
		manifests,
	}: {
		manifests: PackageManifest[]
	}): Promise<PackageInfo[]> {

	const infos = await Promise.all(
		manifests.map(async manifest => {
			const segments = [...manifest.parents, manifest.label]
			const directory = "node_modules/" + segments.join("/node_modules/")
			const path = `${directory}/package.json`
			try {
				const text = await readFile(path, "utf-8")
				const json = json5.parse(text)
				const entry = determinePackageEntry(json)
				return <PackageInfo>{...manifest, entry}
			}
			catch (error) {
				throw new ImportlyLookupError(`error looking at: "${path}"`)
			}
		})
	)
	return infos.filter(s => !!s)
}
