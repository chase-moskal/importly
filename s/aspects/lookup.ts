
import json5 from "json5"
import {readFile} from "fs/promises"

import {ImportlyLookupError} from "./errors.js"
import {PackageManifest, PackageOrder} from "../types.js"
import {determinePackageEntry} from "./utilities/determine-package-entry.js"

export async function lookup({orders}: {
		orders: PackageOrder[]
	}): Promise<PackageManifest[]> {

	const manifests = await Promise.all(
		orders.map(async order => {
			const segments = [...order.parents, order.label]
			const directory = "node_modules/" + segments.join("/node_modules/")
			const path = `${directory}/package.json`
			try {
				const text = await readFile(path, "utf-8")
				const json = json5.parse(text)
				const entry = determinePackageEntry(json)
				return <PackageManifest>{...order, entry}
			}
			catch (error) {
				throw new ImportlyLookupError(`error looking at: "${path}"`)
			}
		})
	)
	return manifests.filter(m => !!m)
}
