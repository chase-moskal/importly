
import json5 from "json5"

import {ImportlyReadingError} from "./errors.js"
import {PackageManifest, SpecificationType} from "../types.js"
import {readPackageJson} from "./utilities/read-package-json.js"
import {readPackageLockJson} from "./utilities/read-package-lock-json.js"

export function parse({dev, specification}: {
		dev: boolean
		specification: string
	}): PackageManifest[] {
	try {
		const json = json5.parse(specification)

		const type: SpecificationType = json.packages
			? SpecificationType.PackageLockJson
			: SpecificationType.PackageJson
		
		switch (type) {
			case SpecificationType.PackageLockJson:
				return readPackageLockJson({dev, json})
			case SpecificationType.PackageJson:
				return readPackageJson({dev, json})
			default:
				throw new ImportlyReadingError("invalid package manifest")
		}
	}
	catch (error) {
		throw new ImportlyReadingError("unable to parse manifest")
	}
}
