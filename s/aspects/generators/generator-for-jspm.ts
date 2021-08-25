
import {prepareCloudGenerator} from "../utilities/prepare-cloud-generator.js"

export const generatorForJspm = prepareCloudGenerator(
	(label, version) => `https://ga.jspm.io/npm:${label}@${version}`
)
