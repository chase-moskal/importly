
import {Linker} from "../../types.js"

export const linkerJspm: Linker =
	(label, version) => `https://ga.jspm.io/npm:${label}@${version}`
