
import json5 from "json5"

import {ImportlyParsingError} from "./errors.js"
import {PackageManifest2, SpecificationType} from "../types.js"
import {readPackageJson2} from "./utilities/read-package-json2.js"
import {readPackageLockJson2} from "./utilities/read-package-lock-json2.js"

export function parse2({production, specification}: {
		production: boolean
		specification: string
	}): PackageManifest2[] {
	try {
		const json = json5.parse(specification)
		const type: SpecificationType = json.packages
			? SpecificationType.PackageLockJson
			: SpecificationType.PackageJson
		switch (type) {

			case SpecificationType.PackageLockJson:
				return readPackageLockJson2({json, production})

			case SpecificationType.PackageJson:
				return readPackageJson2({json, production})

			default:
				throw new ImportlyParsingError("invalid package manifest")
		}
	}
	catch (error) {
		throw new ImportlyParsingError("error parsing manifest")
	}
}
