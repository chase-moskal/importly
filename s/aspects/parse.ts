
import json5 from "json5"

import {ImportlyParsingError} from "./errors.js"
import {PackageOrder, InputType} from "../types.js"
import {readPackageJson} from "./utilities/read-package-json.js"
import {readPackageLockJson} from "./utilities/read-package-lock-json.js"

export function parse({input, production}: {
		input: string
		production: boolean
	}): PackageOrder[] {
	try {
		const json = json5.parse(input)

		const type: InputType = json.packages
			? InputType.PackageLockJson
			: InputType.PackageJson

		switch (type) {

			case InputType.PackageLockJson:
				return readPackageLockJson({json, production})

			case InputType.PackageJson:
				return readPackageJson({json, production})

			default:
				throw new ImportlyParsingError("invalid input")
		}
	}
	catch (error) {
		throw new ImportlyParsingError("error parsing input")
	}
}
