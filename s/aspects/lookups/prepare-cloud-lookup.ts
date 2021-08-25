
import axios from "axios"

import {ImportlyLookupError} from "../errors.js"
import {Linker, Lookup, PackageJson, PackageManifest} from "../../types.js"
import {determinePackageEntry} from "../utilities/determine-package-entry.js"

export const prepareCloudLookup = (linker: Linker): Lookup => async({orders}) => {
	return Promise.all(
		orders.map(async order => {
			const path = `${linker(order.label, order.version)}/package.json`
			try {
				const json: PackageJson = await axios.get(path, {responseType: "json"})
				const entry = determinePackageEntry(json)
				return <PackageManifest>{...order, entry}
			}
			catch (error) {
				throw new ImportlyLookupError(`error looking up "${order.label}" from "${path}"`)
			}
		})
	)
}
