
import {prepareCloudGenerator} from "../utilities/prepare-cloud-generator.js"

export const generatorForJsdelivr = prepareCloudGenerator(
	(label, version) => `https://cdn.jsdelivr.net/npm/${label}@${version}`
)
