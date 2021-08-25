
import {prepareCloudGenerator} from "../utilities/prepare-cloud-generator.js"

export const generatorForUnpkg = prepareCloudGenerator(
	(label, version) => `https://unpkg.com/${label}@${version}`
)
