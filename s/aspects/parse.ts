
import json5 from "json5"

import {ImportlyParsingError} from "./errors.js"
import {PackageManifest, SpecificationType} from "../types.js"
import {readPackageJson} from "./utilities/read-package-json.js"
import {readPackageLockJson} from "./utilities/read-package-lock-json.js"

export function parse({production, specification}: {
		production: boolean
		specification: string
	}): PackageManifest[] {
	try {
		const json = json5.parse(specification)
		const type: SpecificationType = json.packages
			? SpecificationType.PackageLockJson
			: SpecificationType.PackageJson
		switch (type) {

			case SpecificationType.PackageLockJson:
				return readPackageLockJson({json, production})

			case SpecificationType.PackageJson:
				return readPackageJson({json, production})

			default:
				throw new ImportlyParsingError("invalid package manifest")
		}
	}
	catch (error) {
		throw new ImportlyParsingError("error parsing manifest")
	}
}
